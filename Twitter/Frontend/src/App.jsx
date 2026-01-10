import { useEffect, useState } from "react";
import TweetForm from "./Components/TweetForm";
import TweetCard from "./Components/TweetCard";
import React from 'react'

function App() {
  const [tweets, setTweets] = useState([]);

  // Fetch all tweets
  const fetchTweets = async () => {
    const res = await fetch("http://localhost:1515/api/tweets");
    const data = await res.json();
    setTweets(data.reverse()); // show newest first
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  // Add new tweet
  const addTweet = (tweet) => {
    setTweets([tweet, ...tweets]);
  };

  // Update tweet
  const updateTweet = (updated) => {
    setTweets(tweets.map((t) => (t.id === updated.id ? updated : t)));
  };

  // Delete tweet
  const deleteTweet = (id) => {
    setTweets(tweets.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mini Twitter</h1>
      <TweetForm addTweet={addTweet} />
      <div className="mt-6 space-y-4">
        {tweets.length ? (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              updateTweet={updateTweet}
              deleteTweet={deleteTweet}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tweets yet!</p>
        )}
      </div>
    </div>
  );
}

export default App;
