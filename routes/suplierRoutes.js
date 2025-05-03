import express from "express";
import { getSupliers, createSuplier } from "../controllers/suplierController.js";

const router = express.Router();

router.get("/", getSupliers);
router.post("/", createSuplier);

export default router;