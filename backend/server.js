import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
const app = express();

import stocksRouter from "./routes/stocks.js";
import cryptoRouter from "./routes/crypto.js";

app.use(json());

const PORT = process.env.PORT;

app.use("/api/stocks", stocksRouter);
app.use("/api/crypto", cryptoRouter);

app.listen(PORT, () => console.log(`@ http://localhost:${PORT}`));
