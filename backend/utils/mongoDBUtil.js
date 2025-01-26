import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

let mongoClient = null;

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

const initialize = async () => {
    mongoClient = new MongoClient(mongoURI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    await mongoClient.connect();
    console.log("Connected to MongoDB");
};

const getCollection = (collectionName) => {
    return mongoClient.db().collection(collectionName);
};

initialize();

export { mongoClient, initialize, getCollection };
