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
