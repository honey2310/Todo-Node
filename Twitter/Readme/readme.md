# 🐦 Mini Twitter – Tweet Posting App

A **Mini Twitter Home Page** where users can **add, edit, delete, and view tweets**. Built with **React (frontend)**, **Node.js + Express (backend)**, and **JSON file as database**.  

---

## 🔥 Features

- **Add a Tweet** (username + content)
- **Edit a Tweet** (content only)
- **Delete a Tweet**
- **View all Tweets** in a clean timeline
- **Like & Reply buttons** for each tweet (interactive counters)
- **Middleware validation**: tweets cannot be empty and must be at least 5 characters
- **Request logging** with timestamp
- **Professional Twitter-like UI** using Tailwind CSS
- Responsive and clean layout

---

## 📁 File Structure
project/
├─ backend/
│ ├─ app.js
│ ├─ routes/
│ │ └─ tweetRoutes.js
│ ├─ middleware/
│ │ ├─ logger.js
│ │ └─ validateTweet.js
│ ├─ services/
│ │ └─ tweetService.js
│ ├─ data/
│ │ └─ tweets.json
│ └─ package.json
└─ frontend/
├─ public/
│ └─ index.html
├─ src/
│ ├─ components/
│ │ ├─ TweetCard.jsx
│ │ └─ TweetForm.jsx
│ ├─ App.jsx
│ ├─ index.js
│ └─ index.css
└─ package.json


## 2. Start server

~ node app.js

Server runs on: http://localhost:1515


## JSON File

### backend/data/tweets.json stores tweets:

[
  {
    "id": 1,
    "username": "Honey",
    "tweet": "Excited to start my Mini Twitter project! 🚀",
    "createdAt": "2026-01-10T08:30:00.000Z",
    "edited": false
  }
]

## Frontend Components

1. TweetForm.jsx – Form to add tweets with validation & character counter

2. TweetCard.jsx – Displays tweets with:

* Username & timestamp

* Edit/Delete buttons

* Like & Reply buttons with counters


## Demo
https://github.com/user-attachments/assets/3be7b1d3-2820-4b22-b5f7-b3f0b10ac18d


## 🛠 Technologies Used

~ Frontend: React, Tailwind CSS, Heroicons

~ Backend: Node.js, Express.js, fs module

~ Database: JSON file (tweets.json)


## 👤 Author

Honey Deshmukh – Mini Twitter Practical Assignment
