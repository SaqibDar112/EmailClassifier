import React, { useState } from "react";

const GEMINI_KEY = "geminiKey";

export default function GeminiKeyInput({ initialKey = "", onSave }) {
  const [key, setKey] = useState(initialKey);

  const handleSave = () => {
    if (!key || key.length < 5) return alert("Enter a valid API key.");
    localStorage.setItem(GEMINI_KEY, key);
    onSave(key);
    alert("Gemini key saved to localStorage.");
  };

  const handleClear = () => {
    setKey("");
    localStorage.removeItem(GEMINI_KEY);
    onSave("");
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-white">Gemini API Key</h3>
      <p className="text-sm text-gray-400 mb-3">
        Your key is saved in localStorage and sent to your backend for API calls.
      </p>
      <input
        type="password"
        className="w-full border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        placeholder="Enter your Gemini API key..."
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSave}
          className="flex-1 py-2 px-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Save Key
        </button>
        <button
          onClick={handleClear}
          className="py-2 px-3 bg-gray-600 text-gray-200 font-medium rounded-md hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Clear
        </button>
      </div>
    </div>
  );
}