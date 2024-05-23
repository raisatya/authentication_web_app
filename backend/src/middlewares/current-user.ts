import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  fullName: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.cookies.currentUser) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.cookies.currentUser.jwt,
      process.env.JWT_SECRET!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
