import { JwtObject } from "./types";
import jwt from "jsonwebtoken";

export function signJwt(ob: JwtObject): string {
  return jwt.sign(ob, getJwtSecret(), {
    expiresIn: "7d",
  });
}

export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("missing JWT secret");
    process.exit(1);
  }

  return secret;
}
