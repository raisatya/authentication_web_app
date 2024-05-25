import express, { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

import User from '../models/User';
import { Password } from '../services/Password';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Must be an email"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("User not found");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Incorrect Password");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        fullname: existingUser.fullname,
      },
      process.env.JWT_SECRET!
    );

    res.cookie(
      "currentUser",
      { jwt: userJwt }
    );

    res.status(201).send(existingUser);
  }
);

export { router as signinRouter };