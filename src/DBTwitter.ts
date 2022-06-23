import { TweetCollection } from "../models/Tweet";
import { Tweet } from "../database/tweets";

class DBTwitter {
  async getTweets(): Promise<Tweet[]> {
    const tweets = await TweetCollection.find({});
    return tweets;
  }
}

export default DBTwitter;
