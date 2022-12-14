import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandler, listPostHandler } from "./handlers/postHandler";
import { initDb } from "./datastore";
import { signInHandler, signUpHandler } from "./handlers/authHandler";
import { requestLoggerMiddleware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errorMiddleware";

(async () => {
  await initDb();
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(requestLoggerMiddleware);
  app.use(errHandler);

  // Routes
  app.get("/posts", listPostHandler);
  app.post("/posts", createPostHandler);
  app.post("/signup", signUpHandler);
  app.post("/signin", signInHandler);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})();
