import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GEMINI_KEY = "geminiKey";

export default function Home() {
  const [apiKey, setApiKey] = useState(localStorage.getItem(GEMINI_KEY) || "");
  const handleSaveKey = () => {
    if (apiKey.trim() === "") {
      alert("Please enter your API key");
      return;
    }
    localStorage.setItem(GEMINI_KEY, apiKey);
    alert("Gemini API key saved locally!");
  };

  const handleGoogleLogin = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Welcome to Email Classifier
      </h1>

      <div className="bg-gray-800 shadow-2xl p-6 rounded-lg w-full max-w-md ring-1 ring-white/10">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Gemini API Key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API key..."
          className="border-gray-600 bg-gray-700 text-white w-full px-3 py-2 rounded-md mb-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          onClick={handleSaveKey}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full mb-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Save API Key
        </button>

        <button
          onClick={handleGoogleLogin}
          className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-md w-full shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}