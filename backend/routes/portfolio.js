import express from "express";
import { v4 as uuidv4 } from "uuid";
import { getCollection } from "../utils/mongoDBUtil.js";
import authenticate from "../middleware/auth.js";
import Portfolio from "../models/portfolio.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/portfolio", async (req, res, next) => {
    const userId = req.userId;
});

router.post("/create", authenticate, async (req, res) => {
    const { portfolioName, fundingLimit } = req.body;
    if (!portfolioName || !fundingLimit) {
        return res
            .status(400)
            .json({ error: "Portfolio name and funding limit are required" });
    }
    if (isNaN(fundingLimit) || fundingLimit <= 0) {
        return res
            .status(400)
            .json({ error: "Funding limit must be a valid number of dollars" });
    }
    const portfolioId = uuidv4();
    const portfolio = new Portfolio(
        portfolioId,
        req.user.userId,
        portfolioName,
        [],
        [],
        fundingLimit
    );
    await portfolio.save();
    const user = new User(
        req.user.userId,
        req.user.displayName,
        req.user.email,
        req.user.password,
        req.user.leagues,
        [...req.user.portfolios, portfolioId],
        req.user.accessToken
    );
    await user.save();
    res.status(201).json({
        message: "Portfolio created successfully",
        portfolioId,
    });
});

router.post("/delete", authenticate, async (req, res) => {
    const { portfolioId } = req.body;
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
    }
    if (portfolio.userId !== req.user.userId) {
        return res.status(403).json({ error: "You do not own this portfolio" });
    }
    await Portfolio.deleteById(portfolioId);
    const user = new User(
        req.user.userId,
        req.user.displayName,
        req.user.email,
        req.user.password,
        req.user.leagues,
        req.user.portfolios.filter((id) => id !== portfolioId),
        req.user.accessToken
    );
    await user.save();
    res.status(200).json({ message: "Portfolio deleted successfully" });
});

router.post("/buy", authenticate, async (req, res) => {
    const { portfolioId, symbol, shares } = req.body;
    if (!symbol || isNaN(shares) || shares <= 0) {
        return res
            .status(400)
            .json({ error: "Invalid stock symbol or shares" });
    }
    const portfolioData = await Portfolio.findById(portfolioId);
    if (!portfolioData) {
        return res.status(404).json({ error: "Portfolio not found" });
    }
    if (portfolioData.userId !== req.user.userId) {
        return res.status(403).json({ error: "You do not own this portfolio" });
    }
    const portfolio = new Portfolio(
        portfolioData.portfolioId,
        portfolioData.userId,
        portfolioData.name,
        portfolioData.stocks,
        portfolioData.cryptos,
        portfolioData.cash,
        portfolioData.transactions
    );
    portfolio.addStockHolding(symbol, shares);
    portfolio.addTransaction("buy", symbol, shares);
    await portfolio.save();
    res.status(200).json({ message: "Stock purchased successfully" });
});

router.post("/sell", authenticate, async (req, res) => {
    const { portfolioId, symbol, shares } = req.body;
    if (!symbol || isNaN(shares) || shares <= 0) {
        return res
            .status(400)
            .json({ error: "Invalid stock symbol or shares" });
    }
    const portfolioData = await Portfolio.findById(portfolioId);
    if (!portfolioData) {
        return res.status(404).json({ error: "Portfolio not found" });
    }
    if (portfolioData.userId !== req.user.userId) {
        return res.status(403).json({ error: "You do not own this portfolio" });
    }
    const portfolio = new Portfolio(
        portfolioData.portfolioId,
        portfolioData.userId,
        portfolioData.name,
        portfolioData.stocks,
        portfolioData.cryptos,
        portfolioData.cash,
        portfolioData.transactions
    );
    if (!portfolio.canSellStock(symbol, shares)) {
        return res.status(400).json({ error: "Not enough shares to sell" });
    }
    portfolio.removeStockHolding(symbol, shares);
    portfolio.addTransaction("sell", symbol, shares);
    await portfolio.save();
    res.status(200).json({ message: "Stock sold successfully" });
});

export default router;
