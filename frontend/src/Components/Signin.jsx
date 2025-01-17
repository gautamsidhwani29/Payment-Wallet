import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        email,
        password
      }, 
      {withCredentials: true},
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setMsg('Login Successful! Redirecting...');
        navigate('/dashboard', { replace: true });
      }
    } catch (e) {
      setMsg(e.response?.data?.error || "Login Failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and password to sign in
        </p>
        <form className="space-y-4" onSubmit={handleClick}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              id="email"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="johndoe@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
        {msg && (
          <div className="mt-6 bg-white p-4 shadow-md rounded-lg w-full max-w-md">
            <p className="text-center text-gray-800">{msg}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signin;
