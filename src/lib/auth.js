import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const mongoUrl = process.env.MONGODB_URI;
if (!mongoUrl) {
  throw new Error("MONGODB_URL is missing.env");
}

const client = new MongoClient(mongoUrl);
const db = client.db("BookNook");
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
});
