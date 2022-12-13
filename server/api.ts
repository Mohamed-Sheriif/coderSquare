import { Post } from "./types";

// Post API

//create post
export type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
export interface CreatePostResponse {}

//get all
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}

//get single post
export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}
