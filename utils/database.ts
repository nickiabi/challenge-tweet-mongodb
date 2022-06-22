import { connect, disconnect } from "mongoose";
import { TweetCollection } from "../models/Tweet";
import { tweets } from "../database/dataset";

export const createDB = async () => {
  try {
    const uridb = process.env.URIDB || "mongodb://localhost:27017";
    await connect(uridb);
    await TweetCollection.create(tweets);
  } catch (error) {
    console.log(error);
    await disconnect();
  }
};

export const destroyDB = async () => {
  try {
    await TweetCollection.deleteMany();
  } catch (error) {
    console.log(error);
  } finally {
    disconnect();
  }
};
