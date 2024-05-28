import express, { Request, Response } from 'express';

import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.get('/api/users/currentuser', async (req: Request, res: Response) => {
    const token = req.cookies.currentUser;
    if(!token || token.jwt === null)
        return res.send({ currentUser: null });
    
    try {
        const payload = jwt.verify(
            token.jwt,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        return res.send({ currentUser: payload });
    } catch (err) {
        console.log(err);
    }
})

export { router as currentUserRouter };