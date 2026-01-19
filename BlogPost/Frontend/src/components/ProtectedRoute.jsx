import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import React from 'react'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/api/auth/home", { withCredentials: true })
      .then(res => setAuthenticated(true))
      .catch(err => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-20">Checking authentication...</p>;

  return authenticated ? children : <Navigate to="/signin" />;
}
