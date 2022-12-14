import { RequestHandler } from "express";

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  if (req.method === "POST") {
    console.log(req.method, req.path, "- body", req.body);
  } else {
    console.log(req.method, req.path);
  }
  next();
};
