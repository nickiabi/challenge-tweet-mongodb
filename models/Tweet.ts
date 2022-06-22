import { Schema, model } from "mongoose";
import { Tweet } from "../database/dataset";

export const TweetSchema = new Schema<Tweet>({
  _id: { type: Number },
  user_name: { type: String },
  gender: { type: String },
  tweet: { type: String },
  aggressiveness_level: { type: Number },
});

export const TweetCollection = model("Tweet", TweetSchema);
