const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Membuat transaksi baru (dengan pilihan type)
exports.createTransaction = async (req, res) => {
  try {
    const { type, date } = req.body;
    
    let createdTransaction;
    
    if (type === 'OUTBOUND') {
      createdTransaction = await prisma.transaction.create({
        data: {
          type,
          date: new Date(date),
          notes,
          transactionout: {
            create: {
              productId: transactionData.productId,
            }
          }
        },
        include: {
          transactionout: {
            include: {
              product: true
            }
          }
        }
      });
    } else if (type === 'SUPPLIER') {
      createdTransaction = await prisma.transaction.create({
        data: {
          type,
          date: new Date(date),
          notes,
          transactionout: {
            create: {
              productId: transactionData.productId,
              supplierId: transactionData.supplierId,
            }
          }
        },
        include: {
          tsuplier: {
            include: {
              product: true,
              supplier: true
            }
          }
        }
      });
    } else {
      return res.status(400).json({ error: 'Invalid transaction type' });
    }
    
    res.status(201).json(createdTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        transactionout: {
          include: {
            product: true
          }
        },
        tsuplier: {
          include: {
            product: true,
            supplier: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        transactionout: {
          include: {
            product: true
          }
        },
        tsuplier: {
          include: {
            product: true,
            supplier: true
          }
        }
      }
    });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    await prisma.transaction.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};