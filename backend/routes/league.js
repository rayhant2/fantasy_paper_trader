import express from "express";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getCollection } from "../utils/mongoDBUtil.js";
import authenticate from "../middleware/auth.js";
import User from "../models/user.js";
import Portfolio from "../models/portfolio.js";
import League from "../models/league.js";

const router = express.Router();

router.post("/create", authenticate, async (req, res) => {
    const { leagueName, fundingLimit } = req.body;
    if (!leagueName || !fundingLimit) {
        return res
            .status(400)
            .json({ error: "League name and funding limit are required" });
    }
    if (isNaN(fundingLimit) || fundingLimit <= 0) {
        return res
            .status(400)
            .json({ error: "Funding limit must be a valid number of dollars" });
    }
    const leagueId = uuidv4();
    const accessCode = crypto.randomBytes(5).toString("hex");
    const league = new League(
        leagueId,
        leagueName,
        fundingLimit,
        accessCode,
        req.user.userId,
        [req.user.userId]
    );
    await league.save();
    const user = new User(
        req.user.userId,
        req.user.displayName,
        req.user.email,
        req.user.password,
        [...req.user.leagues, [leagueId, null]],
        req.user.portfolios,
        req.user.accessToken
    );
    await user.save();
    res.status(201).json({ message: "League created successfully", leagueId });
});

router.post("/delete", authenticate, async (req, res) => {
    const { leagueId } = req.body;
    const league = await League.findById(leagueId);
    if (!league) {
        return res.status(404).json({ error: "League not found" });
    }
    if (league.ownerId !== req.user.userId) {
        return res.status(403).json({ error: "You do not own this league" });
    }
    // Remove leagueId from usedIn list of associated portfolios
    await Promise.all(
        league.participants.map(async (userId) => {
            const user = await User.findById(userId);
            const leagueEntry = user.leagues.find(([id]) => id === leagueId);
            if (leagueEntry) {
                const portfolioId = leagueEntry[1];
                const portfolioData = await Portfolio.findById(portfolioId);
                if (portfolioData) {
                    const portfolio = new Portfolio(
                        portfolioData.portfolioId,
                        portfolioData.userId,
                        portfolioData.name,
                        portfolioData.stocks,
                        portfolioData.cryptos,
                        portfolioData.cash,
                        portfolioData.transactions,
                        portfolioData.usedIn
                    );
                    portfolio.usedIn = portfolio.usedIn.filter(
                        (id) => id !== leagueId
                    );
                    await portfolio.save();
                }
            }
        })
    );
    const collection = getCollection("leagues");
    await collection.deleteOne({ leagueId });
    res.status(200).json({ message: "League deleted successfully" });
});

router.post("/join", authenticate, async (req, res) => {
    const { accessCode } = req.body;
    const league = await League.findByAccessCode(accessCode);
    if (!league) {
        return res.status(404).json({ error: "League not found" });
    }
    if (league.participants.includes(req.user.userId)) {
        return res
            .status(400)
            .json({ error: "You have already joined this league" });
    }
    league.participants.push(req.user.userId);
    await league.save();
    const user = new User(
        req.user.userId,
        req.user.displayName,
        req.user.email,
        req.user.password,
        [...req.user.leagues, [league.leagueId, null]],
        req.user.portfolios,
        req.user.accessToken
    );
    await user.save();
    res.status(200).json({ message: "Joined league successfully" });
});

router.post("/set-portfolio", authenticate, async (req, res) => {
    const { leagueId, portfolioId } = req.body;
    const league = await League.findById(leagueId);
    if (!league) {
        return res.status(404).json({ error: "League not found" });
    }
    if (!league.participants.includes(req.user.userId)) {
        return res
            .status(403)
            .json({ error: "You are not a participant in this league" });
    }
    const portfolioData = await Portfolio.findById(portfolioId);
    if (!portfolioData || portfolioData.userId !== req.user.userId) {
        return res.status(400).json({ error: "Invalid portfolio" });
    }
    const portfolio = new Portfolio(
        portfolioData.portfolioId,
        portfolioData.userId,
        portfolioData.name,
        portfolioData.stocks,
        portfolioData.cryptos,
        portfolioData.cash,
        portfolioData.transactions,
        portfolioData.usedIn
    );
    if (!portfolio.usedIn.includes(leagueId)) {
        portfolio.usedIn.push(leagueId);
    }
    await portfolio.save();
    const user = new User(
        req.user.userId,
        req.user.displayName,
        req.user.email,
        req.user.password,
        req.user.leagues.map(([id, pid]) =>
            id === leagueId ? [id, portfolioId] : [id, pid]
        ),
        req.user.portfolios,
        req.user.accessToken
    );
    await user.save();
    res.status(200).json({ message: "Portfolio set successfully" });
});

router.post("/leave", authenticate, async (req, res) => {
    const { leagueId } = req.body;
    const league = await League.findById(leagueId);
    if (!league) {
        return res.status(404).json({ error: "League not found" });
    }
    if (!league.participants.includes(req.user.userId)) {
        return res
            .status(400)
            .json({ error: "You are not a participant in this league" });
    }
    if (league.ownerId === req.user.userId) {
        return res
            .status(403)
            .json({ error: "League owner cannot leave the league" });
    }
    league.participants = league.participants.filter(
        (id) => id !== req.user.userId
    );
    await league.save();
    const user = new User(
        req.user.userId,
        req.user.displayName,
        req.user.email,
        req.user.password,
        req.user.leagues.filter(([id]) => id !== leagueId),
        req.user.portfolios,
        req.user.accessToken
    );
    await user.save();
    res.status(200).json({ message: "Left league successfully" });
});

router.get("/leaderboard/:leagueId", authenticate, async (req, res) => {
    const { leagueId } = req.params;
    const league = await League.findById(leagueId);
    if (!league) {
        return res.status(404).json({ error: "League not found" });
    }
    if (!league.participants.includes(req.user.userId)) {
        return res
            .status(403)
            .json({ error: "You are not a participant in this league" });
    }
    const users = await Promise.all(
        league.participants.map(async (userId) => {
            const user = await User.findById(userId);
            const leagueEntry = user.leagues.find(([id]) => id === leagueId);
            if (leagueEntry) {
                const portfolioId = leagueEntry[1];
                const portfolio = await Portfolio.findById(portfolioId);
                if (portfolio) {
                    const portfolioValue = portfolio.stocks.reduce(
                        (acc, stock) => acc + stock.quantity * 10,
                        0
                    );
                    return {
                        userId: user.userId,
                        displayName: user.displayName,
                        portfolioValue,
                    };
                }
            }
            return null;
        })
    );
    const filteredUsers = users.filter((user) => user !== null);
    filteredUsers.sort((a, b) => b.portfolioValue - a.portfolioValue);
    res.status(200).json(filteredUsers);
});

export default router;
