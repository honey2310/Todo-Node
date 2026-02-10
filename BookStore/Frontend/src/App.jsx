import { useEffect, useState } from "react";
import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:3000/api/books";

export default function App() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">📚 BookVerse</h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-slate-400"
            />
            <button
              onClick={() => setShowForm(true)}
              className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800"
            >
              + Add Book
            </button>
          </div>
        </div>
      </header>

      {/* FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Book" : "Add New Book"}
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border px-4 py-2 rounded-lg" required />
              <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="border px-4 py-2 rounded-lg" required />
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border px-4 py-2 rounded-lg" required />
              <input name="coverImage" type="file" onChange={handleChange} className="border px-4 py-2 rounded-lg" />

              <div className="col-span-2 flex gap-3">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 px-6 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOK GRID */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredBooks.map((book) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <img
                src={`http://localhost:3000/${book.coverImage}`}
                alt={book.title}
                className="h-64 w-full object-contain bg-slate-50 p-4"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="font-bold mt-2">₹{book.price}</p>

                <div className="flex gap-2 mt-4">
                  <button onClick={() => setSelectedBook(book)} className="flex-1 bg-slate-800 text-white rounded-lg py-1">
                    View
                  </button>
                  <button onClick={() => handleEdit(book)} className="bg-yellow-400 px-3 rounded-lg">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white px-3 rounded-lg">
                    Del
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* VIEW MODAL */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <img
                src={`http://localhost:3000/${selectedBook.coverImage}`}
                className="h-72 w-full object-contain bg-slate-50 rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
              <p className="text-gray-600">{selectedBook.author}</p>
              <p className="text-xl font-semibold mt-2">₹{selectedBook.price}</p>

              <button
                onClick={() => setSelectedBook(null)}
                className="mt-5 w-full bg-slate-900 text-white py-2 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
