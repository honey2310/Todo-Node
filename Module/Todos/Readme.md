# 📌 Todo API (Express + JSON Database)

A simple REST API built using Node.js, Express, and a local db.json file for storing todo data.
Supports CRUD operations, search, and filtering.

## 🚀 Features

Create a new todo

Read all todos

Update a todo by ID

Delete a todo by ID

Search todos by title

Filter todos by:

Status

Due date

JSON file used as a simple database

Auto-parsing of JSON request bodies


## Your API runs on:

http://localhost:1010

## 📦 API Endpoints
✔ GET All Todos
GET /

## ✔ POST Create Todo
POST /


## Body Example:

{
  "id": 11,
  "title": "Learn Express",
  "description": "Practice CRUD",
  "status": "pending",
  "dueDate": "2025-12-18",
  "createdAt": "2025-12-10"
}

## ✔ PUT Update Todo by ID
PUT /:id

## ✔ DELETE Todo by ID
DELETE /:id

## 🔍 Search & Filter
✔ Search by Title
GET /search?title=react

## ✔ Filter by Status
GET /search?status=pending

## ✔ Filter by Due Date
GET /search?dueDate=2025-12-15

## ✔ Combine Filters
GET /search?status=pending&title=node&dueDate=2025-12-12