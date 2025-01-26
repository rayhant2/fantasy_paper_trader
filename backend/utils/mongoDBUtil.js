import { MongoClient, ServerApiVersion } from "mongodb";

require("dotenv").config();

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

initialize();

export { mongoClient, initialize };
