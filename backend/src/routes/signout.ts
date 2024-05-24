import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/api/users/signout", async (req: Request, res: Response) => {
    res.cookie(
      "currentUser",
      { jwt: null },
      {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      }
    );
    res.send({})
});

export { router as signoutRouter };