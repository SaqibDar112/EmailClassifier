import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
            AI
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">MailClassifier</h1>
            <div className="text-xs text-gray-400">Gemini + React</div>
          </div>
        </div>
        <div className="text-sm text-gray-400">By Saqib Dar</div>
      </div>
    </header>
  );
}