import express from "express";
import AuthController from "../../controllers/AuthController";

const router = express.Router();
// @route       POST   api/auth
// @description Authenticate User and get token
// @access      Public
router.post("/", AuthController.login);

export default router;
