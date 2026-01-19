# 🖋️ StoryStream: A Full-Stack Blogging Platform

**StoryStream** is a modern, full-stack blogging application built using the MERN stack. It features a secure OTP-based authentication system, protected routes, and an interactive dashboard for managing personal stories.

---

## ✨ Features

* **Secure Authentication:** Two-step login process with Email OTP verification.
* **JWT Protected Routes:** Secure cookies handle user sessions via `Auth_token`.
* **Blog Management:** Full CRUD (Create, Read, Update, Delete) functionality for blog posts.
* **Image Uploads:** Integrated with **Multer** for handling blog cover images (supports JPEG, PNG, WEBP).
* **Responsive UI:** Styled with **Tailwind CSS** for a clean, minimalist aesthetic.
* **Accessible Modals:** Custom-built confirmation modals for destructive actions like deleting blogs.

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (Vite)
* **Tailwind CSS**
* **Axios** (API communication with `withCredentials`)
* **React Router Dom** (Navigation & Protected Routes)

### Backend
* **Node.js & Express**
* **MongoDB & Mongoose** (Database)
* **JSON Web Tokens (JWT)** (Secure session management)
* **Nodemailer** (Automated OTP delivery)
* **Multer** (File handling & storage)

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js installed
* MongoDB Atlas account or local MongoDB instance
* Gmail account (for sending OTPs via App Passwords)

### 2. Backend Setup
1.  Navigate to the `/server` folder.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add:
    ```env
    PORT=4000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    EMAIL_USER=your_gmail_address
    EMAIL_PASS=your_gmail_app_password
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### 3. Frontend Setup
1.  Navigate to the `/client` folder.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

---

## 📁 Folder Structure

```text
├── client/
│   ├── src/
│   │   ├── components/  # Modal, ProtectedRoute, Navbar
│   │   ├── pages/       # Home, Signin, VerifyOTP, CreateBlog
│   │   └── services/    # api.js (Axios instance)
├── server/
│   ├── controllers/     # Auth and Blog logic
│   ├── middleware/      # isAuthentication.js
│   ├── models/          # Auth, Blog, and OTP Schemas
│   ├── routes/          # Express route definitions
│   └── uploads/         # Destination for blog images