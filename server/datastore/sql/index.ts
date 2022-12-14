import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { Datastore } from "..";
import { User, Post, Comment, Like } from "../../types";

export class SqlDatastore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    // open the database
    this.db = await open({
      filename: path.join(__dirname, "codersquare.sqlite"),
      driver: sqlite3.Database,
    });

    this.db.run("PRAGMA foreign_keys = ON;");

    this.db.migrate({
      migrationsPath: path.join(__dirname, "migrations"),
    });

    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      "INSERT INTO users (id , email , firstName , lastName , username , password) VALUES (?,?,?,?,?,?)",
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.username,
      user.password
    );
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>(
      `SELECT * FROM users WHERE username = ?`,
      username
    );
  }
  listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>("SELECT * FROM posts");
  }
  async createPost(post: Post): Promise<void> {
    await this.db.run(
      "INSERT INTO posts (id , title , url , userId , postedAt) VALUES (?,?,?,?,?)",
      post.id,
      post.title,
      post.url,
      post.userId,
      post.postedAt
    );
  }
  getPost(id: string): Promise<Post | undefined> {
    throw new Error("Method not implemented.");
  }
  deletePost(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  deleteComment(commentId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createLike(like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
