import DBTwitter from "../src/DBTwitter";
import { createDB, destroyDB } from "../database/database";
import dotenv from "dotenv";
dotenv.config();

const db = new DBTwitter();

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
  const tweet = await db.getTweetById(10);
  expect(tweet?.user_name).toBe("joflaverty9");
});

test("Deberian existir 221 tweets que parecen spam, con nivel 1", async () => {
  const numberOfTweets = await db.getNumberOfTweetsByLevel(1);
  expect(numberOfTweets).toBe(221);
});

test("Deberian existir 187 tweets que son spam, con nivel 5", async () => {
  const numberOfTweets = await db.getNumberOfTweetsByLevel(5);
  expect(numberOfTweets).toBe(187);
});

test("Deberian existir 592 tweets con un nivel de spam entre 2 y 4", async () => {
  const numberOfTweets = await db.getNumberOfTweetsByLevelRange({
    minLevel: 2,
    maxLevel: 4,
  });
  expect(numberOfTweets).toBe(592);
});
