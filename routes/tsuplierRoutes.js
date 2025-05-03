import express from "express";
import { getTsupliers, createTsuplier } from "../controllers/tsuplierController.js";

const router = express.Router();

router.get("/", getTsupliers);
router.post("/", createTsuplier);

export default router;