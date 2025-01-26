import { getCollection } from "../utils/mongoDBUtil.js";

class User {
    constructor(
        userId,
        displayName,
        email,
        password,
        leagues,
        portfolios,
        accessToken = null
    ) {
        this.userId = userId;
        this.displayName = displayName;
        this.email = email;
        this.leagues = leagues; // leagues will be a [[leagueId, portfolioId]] where portfolioId is the portfolio under the user that is being associated with the league
        this.portfolios = portfolios;
        this.password = password;
        this.accessToken = accessToken;
    }

    async save() {
        const collection = getCollection("users");
        await collection.updateOne(
            { email: this.email },
            { $set: this },
            { upsert: true }
        );
    }

    static async findByEmail(email) {
        const collection = getCollection("users");
        return await collection.findOne({ email });
    }

    static async findByAccessToken(accessToken) {
        const collection = getCollection("users");
        return await collection.findOne({ accessToken });
    }

    static async findById(userId) {
        const collection = getCollection("users");
        return await collection.findOne({ userId });
    }
}

export default User;
