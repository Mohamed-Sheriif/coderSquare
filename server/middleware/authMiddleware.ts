import { verifyJwt } from "../auth";
import { ExpressHandler } from "../types";
import { db } from "../datastore";
export const authMiddleware: ExpressHandler<any, any> = async (
  req,
  res,
  next
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({ error: "Not Authorized!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId);

    if (!user) {
      throw "not found";
    }

    next();
  } catch (error) {
    return res.status(401).send({ error: "Bad Token" });
  }
};
