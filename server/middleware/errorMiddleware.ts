import { ErrorRequestHandler } from "express";

export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res
    .sendStatus(500)
    .send(`Oops , an unexpected error occured, plese try again!`);
};
