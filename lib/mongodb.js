import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../config.mjs";

const uri = process.env.MONGODB_URI; // Replace this with your MongoDB connection URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!MONGODB_URI) {
  throw new Error("Please add the MONGODB_URI to your environment variables.");
}

if (process.env.NODE_ENV === "development") {
  if (!client) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  if (!client) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  } else {
    clientPromise = client.connect();
  }
}

export { clientPromise };
