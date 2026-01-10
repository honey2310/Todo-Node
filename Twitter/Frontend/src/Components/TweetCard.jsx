import { useState } from "react";
import React from 'react'
import { ChatBubbleOvalLeftIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function TweetCard({ tweet, updateTweet, deleteTweet }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(tweet.tweet);
  const [likes, setLikes] = useState(0); // for demo
  const [replies, setReplies] = useState(0); // for demo

  const handleUpdate = async () => {
    if (text.length < 5) return;

    const res = await fetch(`http://localhost:1515/api/tweets/${tweet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet: text }),
    });
    const data = await res.json();

    if (res.ok) {
      updateTweet({ ...tweet, tweet: text, edited: true });
      setEditing(false);
    } else {
      alert(data.error);
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:1515/api/tweets/${tweet.id}`, {
      method: "DELETE",
    });
    if (res.ok) deleteTweet(tweet.id);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-bold mr-2">{tweet.username}</span>
          <span className="text-gray-500 text-sm">
            {new Date(tweet.createdAt).toLocaleString()}
          </span>
          {tweet.edited && (
            <span className="ml-2 text-gray-400 text-xs">(Edited)</span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setEditing(true)}
            className="text-blue-500 text-sm hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {editing ? (
        <div className="mt-2 space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-gray-800">{tweet.tweet}</p>
      )}

      {!editing && (
        <div className="flex justify-start mt-3 text-gray-500 space-x-6">

          {/* Like Button */}
          <button
            onClick={() => setLikes(likes + 1)}
            className="flex items-center space-x-1 hover:text-red-500 transition"
          >
            <HeartIcon className="w-5 h-5" />
            <span className="text-sm">{likes}</span>
          </button>
        </div>
      )}
    </div>
  );
}
