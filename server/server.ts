import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandler, listPostHandler } from "./handlers/postHandler";
import { initDb } from "./datastore";
import { signInHandler, signUpHandler } from "./handlers/authHandler";
import { requestLoggerMiddleware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errorMiddleware";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/authMiddleware";

(async () => {
  await initDb();

  dotenv.config();

  const app = express();

  // Middleware
  app.use(express.json());
  app.use(requestLoggerMiddleware);
  app.use(errHandler);

  // Routes

  // public endpoints
  app.post("/signup", signUpHandler);
  app.post("/signin", signInHandler);

  app.use(authMiddleware);

  // protected endpoints
  app.get("/posts", listPostHandler);
  app.post("/posts", createPostHandler);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})();
