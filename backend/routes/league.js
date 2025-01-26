import express from "express";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getCollection } from "../utils/mongoDBUtil.js";
import authenticate from "../middleware/auth.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/create", authenticate, async (req, res) => {
    const { leagueName, fundingLimit } = req.body;
    if (!leagueName || !fundingLimit) {
        return res
            .status(400)
            .send("League name and funding limit are required");
    }
    if (isNaN(fundingLimit) || fundingLimit <= 0) {
        return res
            .status(400)
            .send("Funding limit must be a valid number of dollars");
    }
    const leagueId = uuidv4();
    const accessCode = crypto.randomBytes(5).toString("hex");
    const league = {
        leagueId,
        leagueName,
        fundingLimit,
        accessCode,
        ownerId: req.user.userId,
        participants: [req.user.userId],
    };
    const collection = getCollection("leagues");
    await collection.insertOne(league);
    res.status(201).json({ message: "League created successfully", leagueId });
});

router.post("/delete", authenticate, async (req, res) => {
    const { leagueId } = req.body;
    const collection = getCollection("leagues");
    const league = await collection.findOne({ leagueId });
    if (!league) {
        return res.status(404).send("League not found");
    }
    if (league.ownerId !== req.user.userId) {
        return res.status(403).send("You do not own this league");
    }
    await collection.deleteOne({ leagueId });
    res.status(200).send("League deleted successfully");
});

router.post("/join", authenticate, async (req, res) => {
    const { accessCode } = req.body;
    const collection = getCollection("leagues");
    const league = await collection.findOne({ accessCode });
    if (!league) {
        return res.status(404).send("League not found");
    }
    if (league.participants.includes(req.user.userId)) {
        return res.status(400).send("You have already joined this league");
    }
    league.participants.push(req.user.userId);
    await collection.updateOne(
        { accessCode },
        { $set: { participants: league.participants } }
    );
    const user = new User(
        req.user.userId,
        req.user.displayName,
        req.user.email,
        req.user.password,
        [...req.user.leagues, [league.leagueId, uuidv4()]],
        req.user.portfolios,
        req.user.accessToken
    );
    await user.save();
    res.status(200).send("Joined league successfully");
});

router.post("/leave", authenticate, async (req, res) => {
    const { leagueId } = req.body;
    const collection = getCollection("leagues");
    const league = await collection.findOne({ leagueId });
    if (!league) {
        return res.status(404).send("League not found");
    }
    if (!league.participants.includes(req.user.userId)) {
        return res.status(400).send("You are not a participant in this league");
    }
    if (league.ownerId === req.user.userId) {
        return res.status(403).send("League owner cannot leave the league");
    }
    league.participants = league.participants.filter(
        (id) => id !== req.user.userId
    );
    await collection.updateOne(
        { leagueId },
        { $set: { participants: league.participants } }
    );
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
    res.status(200).send("Left league successfully");
});

export default router;
