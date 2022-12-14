import { UserDao } from "./dao/UserDao";
import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { PostDao } from "./dao/PostDao";
import { SqlDatastore } from "./sql";
//import { InMemorydatastore } from "./memorydb/index";
export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db: Datastore;

export async function initDb() {
  //db = new InMemorydatastore();
  db = await new SqlDatastore().openDb();
}
