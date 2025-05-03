import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { category: true } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, categoryId } = req.body;
        const newProduct = await prisma.product.create({ data: { name, price, categoryId } });
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
