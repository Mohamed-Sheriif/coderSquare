import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandler, listPostHandler } from "./handlers/postHandler";
import asyncHandler from "express-async-handler";
import { initDb } from "./datastore";

(async () => {
  await initDb();
  const app = express();

  const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    if (req.method === "POST") {
      console.log(req.method, req.path, "- body", req.body);
    } else {
      console.log(req.method, req.path);
    }
    next();
  };
  const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    return res
      .sendStatus(500)
      .send(`Oops , an unexpected error occured, plese try again!`);
  };

  // Middleware
  app.use(express.json());
  app.use(requestLoggerMiddleware);
  app.use(errHandler);

  // Routes
  app.get("/posts", listPostHandler);
  app.post("/posts", createPostHandler);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})();
