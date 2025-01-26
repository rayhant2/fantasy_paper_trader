import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
const app = express();

import stocksRouter from "./routes/stocks.js";
import cryptoRouter from "./routes/crypto.js";
import authRouter from "./routes/auth.js";
import leagueRouter from "./routes/league.js";

app.use(json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/api/stocks", stocksRouter);
app.use("/api/crypto", cryptoRouter);
app.use("/api/auth", authRouter);
app.use("/api/league", leagueRouter);

app.listen(PORT, () => console.log(`@ http://localhost:${PORT}`));
