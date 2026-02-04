import AdminNavbar from "../components/AdminNavbar";
import React from 'react'

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <main className="pt-28 px-6">{children}</main>
    </>
  );
}

