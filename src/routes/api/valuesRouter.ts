import express from "express";
import { getValues, getValueById } from "../../controllers/testController";

const router = express.Router();

router.get("/", getValues);
router.get("/:id", getValueById);

export default router;
