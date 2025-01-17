import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthChoice() {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate('/signin');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Welcome to Payments App!
        </h2>
        <p className="text-gray-600 text-center text-lg">
          Please choose how you'd like to proceed
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSignin}
            className="w-40 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition transform hover:scale-105"
          >
            Sign In
          </button>
          <button
            onClick={handleSignup}
            className="w-40 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>New here? <span className="text-blue-500 cursor-pointer hover:underline" onClick={handleSignup}>Create an account</span></p>
          <p>Already have an account? <span className="text-blue-500 cursor-pointer hover:underline" onClick={handleSignin}>Sign in</span></p>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-center text-gray-700">Send and Recive Money</p>
        </div>
      </div>
    </div>
  );
}

export default AuthChoice;
