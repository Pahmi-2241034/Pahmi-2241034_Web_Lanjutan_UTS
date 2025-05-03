import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTransactionouts = async (req, res) => {
    try {
        const transactionouts = await prisma.transactionout.findMany({ include: { category: true } });
        res.json(transactionouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createTransactionout = async (req, res) => {
    try {
        const { tgl, productId } = req.body;
        const newTransactionout = await prisma.transactionout.create({ data: { tgl, productId } });
        res.json(newTransactionout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};