import { useState } from "react";
import React from 'react'

export default function TweetForm({ addTweet }) {
  const [username, setUsername] = useState("");
  const [tweet, setTweet] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !tweet) {
      setError("All fields are required");
      return;
    }
    if (tweet.length < 5) {
      setError("Tweet must be at least 5 characters long");
      return;
    }

    try {
      const res = await fetch("http://localhost:1515/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, tweet }),
      });

      const data = await res.json();
      if (res.ok) {
        addTweet(data.tweet);
        setTweet("");
        setUsername("");
        setError("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to post tweet");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow-md space-y-3"
    >
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <textarea
        placeholder="What's happening?"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        maxLength={280}
      />
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">{tweet.length}/280</span>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Tweet
        </button>
      </div>
    </form>
  );
}
