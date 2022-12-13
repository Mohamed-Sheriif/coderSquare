import { RequestHandler } from "express";
import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";

export const listPostHandler: ExpressHandler<{}, {}> = (req, res) => {
  res.json({ posts: db.listPosts() });
};

type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
interface CreatePostResponse {}

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
  if (!req.body.title || !req.body.userId || !req.body.url) {
    return res.sendStatus(400);
  }

  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  db.createPost(post);
  res.sendStatus(200);
};
