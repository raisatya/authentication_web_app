import express, { Request, Response } from 'express';

import jwt, { JwtPayload } from "jsonwebtoken";
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, async (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null });
})

export { router as currentUserRouter };