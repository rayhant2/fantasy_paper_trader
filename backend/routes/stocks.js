const router = require("express").Router();
const axios = require("axios");
const apikey = process.env.ALPHA_VANTAGE_API_KEY;

router.get("/stockinfo", async (req, res, next) => {
  const symbol = req.query.symbol;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apikey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching stock info", error);
    res.status(500).json({ error: "Failed to fetch stock info" });
  }
});

module.exports = router;
