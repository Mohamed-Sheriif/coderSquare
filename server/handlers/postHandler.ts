import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";
import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostRequest,
  GetPostResponse,
  ListPostsRequest,
  ListPostsResponse,
} from "../api";
import crypto from "crypto";

export const listPostHandler: ExpressHandler<
  ListPostsRequest,
  ListPostsResponse
> = async (req, res) => {
  res.json({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = async (req, res) => {
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
  await db.createPost(post);
  res.sendStatus(200);
};

/*export const getPostHandler: ExpressHandler<GetPostRequest, GetPostResponse> = (
  req,
  res
) => {
  const { id } = req.params;
  const post: Post | undefined = db.getPost(id);
  if (!post) {
    return res.sendStatus(404).send(`post with id : ${id} not found!`);
  }
  res.sendStatus(200).send(post);
};*/
