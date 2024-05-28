import express, { Request, Response } from 'express';
import 'express-async-errors';

import cookieParser from 'cookie-parser';
import cors from 'cors';

import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { existingUserRouter } from './routes/existing-user';

const app = express();

app.use(express.json());
app.use(cookieParser());

const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ["http://localhost:5173"];
const allowedOrigins =
  process.env.NODE_ENV == "production" ? prodOrigins : devOrigin;

app.use(
  cors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV === "production") {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`${origin} not allowed by cors`));
        }
      } else {
        callback(null, true);
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(existingUserRouter);


app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };