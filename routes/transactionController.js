import express from "express";
import { getAllTransactions, getTransactionById, createTransaction, deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/", getTransactionById);
router.post("/", createTransaction);
router.delete("/", deleteTransaction);

export default router;