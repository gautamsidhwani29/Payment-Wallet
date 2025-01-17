// src/NotFoundPage.js
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! The page you're looking for doesn't exist.</p>
        <p className="text-gray-500 mb-6">It might have been moved or deleted, or you may have typed the URL incorrectly.</p>
        <a href="/" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
