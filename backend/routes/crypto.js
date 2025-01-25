const router = require("express").Router();
const axios = require("axios");
const apikey = process.env.ALPHA_VANTAGE_API_KEY;

router.get("/cryptoinfo", async (req, res, next) => {
  const fromCurrency = req.query.from;
  const toCurrency = req.query.to;

  const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apikey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching crypto info", error);
    res.status(500).json({ error: "Failed to fetch crypto info" });
  }
});

module.exports = router;
