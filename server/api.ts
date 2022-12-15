import { Post, User } from "./types";

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

// User API
export type SignUpRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "username" | "password"
>;
export interface SignUpResponse {
  jwt: string;
}

export interface SignInRequest {
  login: string; // email or username
  password: string;
}

export type SignInResponse = {
  user: Pick<User, "email" | "firstName" | "lastName" | "username" | "id">;
  jwt: string;
};
