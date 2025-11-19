// src/Pages/Login.js (or src/Components/Login.js depending on your structure)
import React, { useState } from "react";
import { auth } from "../firebase.init";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; //

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ new hook
//
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true"); // ✅ for protected routes
      navigate("/"); // ✅ redirect to dashboard/home
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md relative overflow-hidden">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/assets/logo.svg" alt="Raigam Logo" className="h-16 w-auto" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to Raigam
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-indigo-600 hover:underline text-sm"
            onClick={() => alert("Password reset functionality coming soon.")}
          >
            Forgot Password?
          </button>
        </div>

        {/* Decorative Background */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-300 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Login;
