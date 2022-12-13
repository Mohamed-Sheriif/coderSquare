import express, { RequestHandler } from "express";
import { db } from "./datastore/index";

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

//middleware
app.use(express.json());
app.use(requestLoggerMiddleware);

app.get("/posts", (req, res) => {
  res.json({ posts: db.listPosts() });
});

app.post("/posts", (req, res) => {
  const post = req.body;
  db.createPost(post);
  res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
