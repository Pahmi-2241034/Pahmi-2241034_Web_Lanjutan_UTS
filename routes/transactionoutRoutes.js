import express from "express";
import { getTransactionouts, createTransactionout } from "../controllers/transactionoutController.js";

const router = express.Router();

router.get("/", getTransactionouts);
router.post("/", createTransactionout);

export default router;