import express from "express";
const router = express.Router();
import axios from "axios";
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
//import getWeekStartTime from "../utils/dateUtils";

router.get("/crypto", async (req, res, next) => {
  const cryptoCurrency = req.query.from;
  const toCurrency = req.query.to;

  const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cryptoCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching crypto info", error);
    res.status(500).json({ error: "Failed to fetch crypto info" });
  }
});

router.get("/crypto-news", async (req, res, next) => {
  const cryptoCurrency = req.query.from;
  const toCurrency = req.query.to;

  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:BTC,FOREX:USD&time_from=${getWeekStartTime()}&limit=1000&apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching crypto info", error);
    res.status(500).json({ error: "Failed to fetch crypto info" });
  }
});

export default router;
