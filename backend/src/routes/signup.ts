import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("fullname").not().isEmpty().withMessage("Full name must not be empty"),
    body("username")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 4, max: 12 })
      .withMessage("Username must not be empty"),
    body("email").isEmail().withMessage("Must be an email id"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, username, password, fullname } = req.body;

    const existingUser = await User.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    if (existingUser) {
      throw new BadRequestError("Username already taken");
    }

    const newUser = await User.create({
      email,
      username,
      password,
      fullname,
    });

    const userJwt = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        fullname: newUser.fullname,
      },
      process.env.JWT_SECRET!
    );

    res.cookie(
      "currentUser",
      { jwt: userJwt },
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      }
    );

    res.status(201).send(newUser);
  }
);

export { router as signupRouter };