import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/api/users/signout", async (req: Request, res: Response) => {
    res.cookie("currentUser", { jwt: null }, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    });
    res.send({})
});

export { router as signoutRouter };