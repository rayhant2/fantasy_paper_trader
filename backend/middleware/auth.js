import User from "../models/user.js";

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Access token required" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const user = await User.findByAccessToken(token);
        if (!user || user.email !== req.body.email) {
            return res
                .status(401)
                .json({ error: "Invalid access token or email" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid access token or email" });
    }
};

export default authenticate;
