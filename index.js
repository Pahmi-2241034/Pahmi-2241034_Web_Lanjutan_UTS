import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import suplierRoutes from "./routes/suplierRoutes.js";
import tsuplierRoutes from "./routes/tsuplierRoutes.js";
import transactionoutRoutes from "./routes/transactionoutRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/supliers", suplierRoutes);
app.use("/tsupliers", tsuplierRoutes);
app.use("/transactionouts", transactionoutRoutes);
app.use("/transaction", transactionRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
