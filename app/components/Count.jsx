"use client";
import React, { useState } from "react";

function Count() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6 text-center space-y-4 w-64">
        <h1 className="text-xl font-semibold text-gray-700">
          Count: <span className="text-indigo-600">{count}</span>
        </h1>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
          >
            Increment
          </button>
          <button
            onClick={() => setCount((prev) => prev - 1)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}

export default Count;
