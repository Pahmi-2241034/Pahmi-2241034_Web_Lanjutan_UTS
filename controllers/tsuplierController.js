import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTsupliers = async (req, res) => {
    try {
        const tsupliers = await prisma.tsuplier.findMany({ include: { category: true } });
        res.json(tsupliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createTsuplier = async (req, res) => {
    try {
        const { tgl, suplierId, productId } = req.body;
        const newTsuplier = await prisma.tsuplier.create({ data: { tgl, suplierId, productId } });
        res.json(newTsuplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};