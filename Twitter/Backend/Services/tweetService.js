import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filepath = path.join(__dirname, "../Data/tweets.json");

export const readTweets = () => {
  if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, "[]");
  const data = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(data || "[]");
};

export const writeTweets = (tweets) => {
  fs.writeFileSync(filepath, JSON.stringify(tweets, null, 2));
};
