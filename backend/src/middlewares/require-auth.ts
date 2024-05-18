import { NotAuthorizedError } from "../errors/not-authorized-error";
import { NextFunction, Request, Response } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
