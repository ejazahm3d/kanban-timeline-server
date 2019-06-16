import express, { Request, Response } from "express";
import { registerUser } from "../../controllers/auth";

const router = express.Router();
// @route       POST   api/auth
// @description Authenticate User and get token
// @access      Public
router.post("/register", registerUser);
router.get("/signin", (req: Request, res: Response) => {
  return res.json("Signin");
});

export default router;
