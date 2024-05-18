import express, { Request, Response } from 'express';
import { body } from "express-validator";

import User from '../models/User';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  "/api/users/existinguser",
  [
    body("email").isEmail().withMessage("Must be an email id"),
    body("username")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 4, max: 12 })
      .withMessage("Username must be between 4 and 12 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, username } = req.body;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new BadRequestError("Email Id already registered");
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      throw new BadRequestError("Username already taken");
    }

    return res.status(200).send({ uniqueUser: true });
  }
);

export { router as existingUserRouter };