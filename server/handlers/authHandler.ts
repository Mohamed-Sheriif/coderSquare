import { User, ExpressHandler } from "../types";
import crybto from "crypto";
import { db } from "../datastore";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../api";
import { signJwt } from "../auth";

export const signUpHandler: ExpressHandler<
  SignUpRequest,
  SignUpResponse
> = async (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;
  if (!email || !username || !firstName || !lastName || !password) {
    return res.sendStatus(400).send({ error: "all fields are required!" });
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));

  if (existing) {
    return res.sendStatus(403).send({ error: "User already exist!" });
  }

  const user: User = {
    id: crybto.randomUUID(),
    email,
    firstName,
    lastName,
    username,
    password: getHashPassword(password),
  };

  const jwt = signJwt({ userId: user.id });

  await db.createUser(user);
  return res.status(200).send({ jwt });
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

  if (!existing || existing.password !== getHashPassword(password)) {
    return res.sendStatus(403);
  }

  const jwt = signJwt({ userId: existing.id });

  res.status(200).send({
    user: {
      id: existing.id,
      email: existing.email,
      username: existing.username,
      firstName: existing.firstName,
      lastName: existing.lastName,
    },
    jwt,
  });
};

function getHashPassword(password: string): string {
  return crybto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, "sha512")
    .toString("hex");
}
