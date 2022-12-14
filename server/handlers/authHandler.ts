import { User, ExpressHandler } from "../types";
import crybto from "crypto";
import { db } from "../datastore";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../api";

export const signUpHandler: ExpressHandler<
  SignUpRequest,
  SignUpResponse
> = async (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;
  if (!email || !username || !firstName || !lastName || !password) {
    return res.sendStatus(400);
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));

  if (existing) {
    return res.sendStatus(403);
  }

  const user: User = {
    id: crybto.randomUUID(),
    email,
    firstName,
    lastName,
    username,
    password,
  };

  await db.createUser(user);
  return res.sendStatus(200);
};

export const signInHandler: ExpressHandler<
  SignInRequest,
  SignInResponse
> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.sendStatus(400);
  }

  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  if (!existing || existing.password !== password) {
    return res.sendStatus(403);
  }

  res.status(200).send({
    id: existing.id,
    email: existing.email,
    username: existing.username,
    firstName: existing.firstName,
    lastName: existing.lastName,
  });
};
