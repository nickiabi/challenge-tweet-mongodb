import DBTwitter from "../src/DBTwitter";
import { createASmallDB, createDB, destroyDB } from "../database/database";
import dotenv from "dotenv";
import { Tweet } from "../database/tweets";
dotenv.config();

const db = new DBTwitter();

describe("Query's over DBTwitter", () => {
  beforeAll(() => {
    return createDB();
  });

  afterAll(() => {
    return destroyDB();
  });
  test("Deberian existir 1000 tweets", async () => {
    const tweets = await db.getTweets();
    expect(tweets.length).toBe(1000);
  });

  test("Deberian existir 442 usuarios", async () => {
    const numberOfTweets = await db.getNumberOfMaleUsers();
    expect(numberOfTweets).toBe(442);
  });

  test("Deberian existir 443 usuarias ", async () => {
    const numberOfTweets = await db.getNumberOfFemaleUsers();
    expect(numberOfTweets).toBe(443);
  });

  test("Deberia existir un tweet con id 10 de un usuario llamado joflaverty9 ", async () => {
    const tweet = await db.getTweetById({ id: 10 });
    expect(tweet?.user_name).toBe("joflaverty9");
  });
  test("Deberian existir 221 tweets que parecen spam, con nivel 1", async () => {
    const numberOfTweets = await db.getNumberOfTweetsByLevel({ level: 1 });
    expect(numberOfTweets).toBe(221);
  });

  test("Deberian existir 187 tweets que son spam, con nivel 5", async () => {
    const numberOfTweets = await db.getNumberOfTweetsByLevel({ level: 5 });
    expect(numberOfTweets).toBe(187);
  });

  test("Deberian existir 592 tweets con un nivel de spam entre 2 y 4", async () => {
    const numberOfTweets = await db.getNumberOfTweetsByLevelRange({
      minLevel: 2,
      maxLevel: 4,
    });
    expect(numberOfTweets).toBe(592);
  });
});

describe("CRUD Operations over DB Twitter", () => {
  beforeEach(() => {
    return createASmallDB();
  });

  afterEach(() => {
    return destroyDB();
  });

  test("Deberian existir 10 tweets", async () => {
    const tweets = await db.getTweets();
    expect(tweets.length).toBe(10);
  });

  test("Deberia existir un tweet menos tras eliminar uno", async () => {
    const tweetsBeforeDelete = (await db.getTweets()).length;
    await db.deleteTweet({ id: 9 });
    const tweetsAfterDelete = (await db.getTweets()).length;
    expect(tweetsBeforeDelete).toBe(tweetsAfterDelete + 1);
  });

  test("Deberia existir un tweet mas tras crear uno", async () => {
    const tweetsBeforeDelete = (await db.getTweets()).length;
    const tweet: Tweet = {
      _id: 11,
      user_name: "joflaverty9",
      gender: "Female",
      tweet: "Hola",
      spam_level: 1,
    };
    await db.addTweet(tweet);
    const tweetsAfterDelete = (await db.getTweets()).length;
    expect(tweetsBeforeDelete).toBe(tweetsAfterDelete + 1);
  });

  test("Deberia cambiar el nombre de usuario del primer tweet", async () => {
    const tweet = await db.getTweetById({ id: 1 });
    const nameUsarBeforeUpdate = tweet?.user_name;
    await db.updateTweet({
      _id: 1,
      user_name: "joflaverty9",
    });
    const tweetAfterUpdate = await db.getTweetById({ id: 1 });
    const nameUsarAfterUpdate = tweetAfterUpdate?.user_name;
    expect(nameUsarBeforeUpdate).not.toBe(nameUsarAfterUpdate);
  });
});
