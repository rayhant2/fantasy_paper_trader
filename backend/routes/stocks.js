import express from "express";
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
import axios from "axios";
const router = express.Router();

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

export default router;
