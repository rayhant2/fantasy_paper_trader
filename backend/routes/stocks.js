import express from "express";
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
import axios from "axios";
const router = express.Router();

const getCurrentPrice = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data["Global Quote"];
    return 222; //parseFloat(data["05. price"]);
};

router.get("/stock", async (req, res, next) => {
    const symbol = req.query.symbol;
    const interval = req.query.interval;
    const url = `https://www.alphavantage.co/query?function=${interval}&symbol=${symbol}&interval=1min&apikey=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error("Error fetching stock data", error);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
});

router.get("/stock-quote", async (req, res, next) => {
    const symbol = req.query.symbol;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error("Error fetching stock quote", error);
        res.status(500).json({ error: "Failed to fetch stock quote" });
    }
});

router.get("/stock-news", async (req, res, next) => {
    const symbol = req.query.symbol;
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error("Error fetching stock news", error);
        res.status(500).json({ error: "Failed to fetch stock news" });
    }
});

export { getCurrentPrice };
export default router;
