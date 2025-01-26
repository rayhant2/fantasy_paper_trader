const router = require("express").Router();
const axios = require("axios");

router.get("/portfolio", async (req, res, next) => {
  const userId = req.userId;
});

router.post("/buy", async (req, res, next) => {
  const userId = req.body.userId;
});

router.post("/sell", async (req, res, next) => {
  const userId = req.body.userId;
});
