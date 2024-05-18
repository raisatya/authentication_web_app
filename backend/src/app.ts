import express from 'express';
import 'express-async-errors';

import cookieParser from 'cookie-parser';
import cors from 'cors';

import { signupRouter } from './routes/signup';
import { getAllUsersRouter } from './routes/get-users';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { existingUserRouter } from './routes/existing-user';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(getAllUsersRouter);
app.use(existingUserRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };