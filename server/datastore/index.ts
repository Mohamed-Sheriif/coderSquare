import { UserDao } from "./dao/UserDao";
import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { PostDao } from "./dao/PostDao";
import { InMemorydatastore } from "./memorydb/index";
export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export const db = new InMemorydatastore();
