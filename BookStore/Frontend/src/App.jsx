import { useEffect, useState } from "react";
import React from 'react'

const API = "http://localhost:3000/api/books";

export default function App() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    coverImage: null,
  });

  const fetchBooks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    const url = editId ? `${API}/${editId}` : API;
    const method = editId ? "PUT" : "POST";

    await fetch(url, { method, body: formData });

    setShowForm(false);
    setEditId(null);
    setForm({ title: "", author: "", price: "", coverImage: null });
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditId(book._id);
    setForm({ title: book.title, author: book.author, price: book.price, coverImage: null });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchBooks();
  };

  const handleView = (book) => {
    setSelectedBook(book);
  };

  const closeView = () => setSelectedBook(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📚 Book Store</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Book
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={form.author}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="file"
                name="coverImage"
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <div className="col-span-2 flex gap-3">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <img
                src={`http://localhost:3000/${selectedBook.coverImage}`}
                alt={selectedBook.title}
                className="h-64 w-full object-contain bg-gray-50 rounded mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
              <p className="text-gray-600 mb-1"><strong>Author:</strong> {selectedBook.author}</p>
              <p className="text-gray-600 mb-1"><strong>Price:</strong> ₹{selectedBook.price}</p>
              <p className="text-gray-700 mt-3">
                This book is part of our professionally curated collection, offering high-quality content and excellent reading experience.
              </p>
              <button
                onClick={closeView}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded shadow hover:shadow-lg transition">
              <img
                src={`http://localhost:3000/${book.coverImage}`}
                alt={book.title}
                className="h-60 w-full object-contain bg-gray-50 rounded-t p-2"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Author: {book.author}</p>
                <p className="text-sm text-gray-600 mt-1">
                  A professionally curated book available in our store.
                </p>
                <p className="font-bold mt-2">₹{book.price}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleView(book)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
