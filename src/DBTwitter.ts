import { TweetCollection } from "../models/Tweet";
import { Tweet } from "../database/tweets";

class DBTwitter {
  async getTweets(): Promise<Tweet[]> {
    const tweets = await TweetCollection.find({});
    return tweets;
  }

  getNumberOfTweetsByLevel(level: number) {
    throw new Error("Method not implemented.");
  }

  async getNumberOfTweetsByLevelRange({
    minLevel = 1,
    maxLevel = 5,
  }: {
    minLevel?: number;
    maxLevel?: number;
  }): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async getTweetById(id: number): Promise<Tweet | null> {
    throw new Error("Method not implemented.");
  }
  async getNumberOfFemaleUsers(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async getNumberOfMaleUsers(): Promise<number> {
    throw new Error("Method not implemented.");
  }
}

export default DBTwitter;
