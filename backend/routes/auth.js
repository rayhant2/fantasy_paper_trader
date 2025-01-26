import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        return res.status(400).send("All fields are required");
    }
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        return res.status(400).send("User already exists");
    }
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(userId, displayName, email, hashedPassword, [], []);
    await user.save();
    res.status(201).send("User registered successfully");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userData = await User.findByEmail(email);
    if (userData && (await bcrypt.compare(password, userData.password))) {
        const accessToken = crypto.randomBytes(10).toString("hex");
        const user = new User(
            userData.userId,
            userData.displayName,
            userData.email,
            userData.password,
            userData.leagues,
            userData.portfolios,
            accessToken
        );
        await user.save();
        res.status(200).json({
            accessToken,
            displayName: user.displayName,
            userId: user.userId,
        });
    } else {
        res.status(401).send("Invalid email or password");
    }
});

export default router;
