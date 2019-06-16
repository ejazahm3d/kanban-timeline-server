import express, { Request, Response } from "express";
import { registerUser } from "../../controllers/AuthController";

const router = express.Router();
// @route       POST   api/user
// @description Register User
// @access      Public
router.post("/", registerUser);
router.get("/signin", (req: Request, res: Response) => {
  return res.json("Signin");
});

export default router;
