import { getCollection } from "../utils/mongoDBUtil.js";

class League {
    constructor(
        leagueId,
        name,
        fundingLimit,
        accessCode,
        ownerId,
        participants
    ) {
        this.leagueId = leagueId;
        this.name = name;
        this.fundingLimit = fundingLimit;
        this.accessCode = accessCode;
        this.ownerId = ownerId;
        this.participants = participants;
    }

    async save() {
        const collection = getCollection("leagues");
        await collection.updateOne(
            { leagueId: this.leagueId },
            { $set: this },
            { upsert: true }
        );
    }

    static async findById(leagueId) {
        const collection = getCollection("leagues");
        return await collection.findOne({ leagueId });
    }

    static async findByAccessCode(accessCode) {
        const collection = getCollection("leagues");
        return await collection.findOne({ accessCode });
    }

    async addParticipant(userId) {
        if (!this.participants.includes(userId)) {
            this.participants.push(userId);
            await this.save();
        }
    }

    async removeParticipant(userId) {
        this.participants = this.participants.filter((id) => id !== userId);
        await this.save();
    }
}

export default League;
