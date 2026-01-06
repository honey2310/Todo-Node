# 🎬 Movie Management System

A full-stack **Movie Management System** built using **React, Node.js, Express, MongoDB, and Tailwind CSS**.  
This application allows users to **add, view, edit, delete, and search movies** with poster images and descriptions.

---

## 🚀 Features

- ➕ Add new movies with poster image & description  
- ✏️ Edit existing movies  
- ❌ Delete movies with confirmation dialog  
- 👁 View movie details in popup modal  
- 🔍 Search movies by title  
- 🖼 Image upload using Multer  
- 🎨 Modern UI with Tailwind CSS  
- 📦 MongoDB database integration  

---

## 🛠 Tech Stack

### Frontend
- React
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (Image Upload)

---

## 📁 Project Structure

movie-management/
│
├── backend/
│ ├── Models/
│ │ └── MovieModel.js
│ ├── Controllers/
│ │ └── MovieController.js
│ ├── Routes/
│ │ └── MovieRoutes.js
│ ├── uploads/
│ └── server.js
│
├── frontend/
│ ├── components/
│ │ ├── MovieForm.jsx
│ │ ├── MovieList.jsx
│ └── App.jsx
│
└── README.md


## 📌 API Endpoints
Method	    Endpoint	         Description
POST	   /movies	            Add new movie
GET	       /movies	            Get all movies
GET	       /movies/:id	        Get movie by ID
PUT	       /movies/:id	        Update movie
DELETE	   /movies/:id	        Delete movie
GET	       /movies/search?q=    Search movies

## 🧾 Movie Schema
{
  title: String,
  genre: String,
  year: Number,
  description: String,
  poster: String
}


##🖼 Image Upload

Images are uploaded using Multer

Stored in the /uploads folder

### Access images via:

http://localhost:2000/uploads/filename.


## 🧪 Testing with Postman

Use form-data for POST & PUT requests:

Key	            Type
title	        Text
genre	        Text
year	        Text
description	    Text
poster	        File


## demo
https://github.com/user-attachments/assets/0e4f0632-27fa-4a61-aa8e-cac25f947f86


