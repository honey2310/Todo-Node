import express from "express";
import { readTweets, writeTweets } from "../Services/tweetService.js";
import validateTweet from "../Middleware/validateTweet.js";

const router = express.Router();

// ---------- GET all tweets ----------
router.get("/", (req, res) => {
  const tweets = readTweets();
  res.json(tweets);
});

// ---------- POST new tweet ----------
router.post("/", validateTweet, (req, res) => {
  const tweets = readTweets();
  const { username, tweet } = req.body;

  const newTweet = {
    id: tweets.length ? tweets[tweets.length - 1].id + 1 : 1,
    username,
    tweet,
    createdAt: new Date().toISOString(),
    edited: false,
  };

  tweets.push(newTweet);
  writeTweets(tweets);

  res.json({ msg: "Tweet added successfully!", tweet: newTweet });
});

// ---------- PUT update tweet ----------
router.put("/:id", validateTweet, (req, res) => {
  const id = Number(req.params.id);
  const tweets = readTweets();
  const { tweet } = req.body;

  let updated = false;

  const updatedTweets = tweets.map((t) => {
    if (t.id === id) {
      updated = true;
      return { ...t, tweet, edited: true };
    }
    return t;
  });

  if (!updated) return res.status(404).json({ error: "Tweet not found" });

  writeTweets(updatedTweets);
  res.json({ msg: "Tweet updated successfully!" });
});

// ---------- DELETE tweet ----------
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const tweets = readTweets();

  const newTweets = tweets.filter((t) => t.id !== id);

  if (newTweets.length === tweets.length)
    return res.status(404).json({ error: "Tweet not found" });

  writeTweets(newTweets);
  res.json({ msg: "Tweet deleted successfully!" });
});

export default router;
