import dotenv from "dotenv";
import * as mongo from "mongodb";
dotenv.config();

type CollectionType = mongo.Collection | null;

// global var
export const collections: { [key: string]: CollectionType } = {};

const URI: string = process.env.MONGO_DOCKER!;

// init connection
export async function connectDB() {
  try {
    dotenv.config();

    const client: mongo.MongoClient = new mongo.MongoClient(URI);

    await client.connect();
    
    const db: mongo.Db = client.db("basecamp");

    console.log(`Connected to ${db.databaseName} database`);

    collections.users = client.db("basecamp").collection("users");

    console.log(`connected to ${Object.entries(collections).length} collection${Object.entries(collections).length > 1 ? "s" : ""}`);
    console.log(`connected to the following collections: ${Object.keys(collections).join(", ")}`);

  } catch (err) {
    console.log(err);
  }
}