import express, { Request, Response } from "express";
import { UserController } from "../../controllers/UserController";
const router = express.Router();
// @route       POST   api/user
// @description Register User
// @access      Public
router.post("/", UserController.newUser);

export default router;
