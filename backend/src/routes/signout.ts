import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/api/users/signout", async (req: Request, res: Response) => {
    res.clearCookie('currentUser');

    res.send({})
});

export { router as signoutRouter };