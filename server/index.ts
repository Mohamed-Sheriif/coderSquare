import express, { RequestHandler } from "express";
import { db } from "./datastore/index";
import { createPostHandler, listPostHandler } from "./handlers/postHandler";

const app = express();

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  if (req.method === "POST") {
    console.log(req.method, req.path, "- body", req.body);
  } else {
    console.log(req.method, req.path);
  }
  next();
};

const posts: any[] = [];

// Middleware
app.use(express.json());
app.use(requestLoggerMiddleware);

// Routes
app.get("/posts", listPostHandler);
app.post("/posts", createPostHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
