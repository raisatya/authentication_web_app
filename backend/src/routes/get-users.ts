import express, { Request, Response } from 'express';

import User from '../models/User';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users', requireAuth, async (req: Request, res: Response) => {
    const users = await User.find();

    res.status(200).send(users);
})

export { router as getAllUsersRouter };