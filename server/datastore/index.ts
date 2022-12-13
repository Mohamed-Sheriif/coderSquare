import { UserDao } from "./UserDao";
import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { PostDao } from "./PostDao";
import { InMemorydatastore } from "./memorydb/index";
export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export const db = new InMemorydatastore();
