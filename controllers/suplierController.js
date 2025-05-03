export const createSuplier = async (req, res) => {
    try {
        const { name, phone } = req.body;
        if (!name) return res.status(400).json({ error: "Nama kategori diperlukan" });

        const newSuplier = await prisma.suplier.create({
            data: { name, phone },
        });

        res.status(201).json(newSuplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};