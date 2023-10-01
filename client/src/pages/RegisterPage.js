import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import Link and Navigate from react-router-dom

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); // Add state for redirection

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      alert('Registration successful');
      setRedirect(true); // Redirect to login page on successful registration
    } else {
      alert('Registration failed');
    }
  }

  // Redirect to login page after successful registration
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <img
          src="/images/the-folks-official.png" // Replace with your logo image path
          alt="Logo"
          className="mx-auto mb-4 h-16"
        />
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
        <form className="space-y-4" onSubmit={register}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
        {/* Add "Already have an account? Login" Link */}
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
