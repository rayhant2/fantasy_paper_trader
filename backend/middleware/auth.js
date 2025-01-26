import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Access token required");
    }

    const token = authHeader.split(" ")[1];
    try {
        const user = await User.findByAccessToken(token);
        if (!user) {
            return res.status(401).send("Invalid access token");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send("Invalid access token");
    }
};

export default authenticate;
