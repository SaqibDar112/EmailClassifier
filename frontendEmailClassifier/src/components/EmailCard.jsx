import React from "react";

const getCategoryStyles = (category) => {
  const baseStyle = "inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full";

  switch (category?.toLowerCase()) {
    case "important":
      return `${baseStyle} bg-red-500 text-white`;
    case "promotions":
      return `${baseStyle} bg-blue-500 text-white`;
    case "social":
      return `${baseStyle} bg-green-500 text-white`;
    case "marketing":
      return `${baseStyle} bg-yellow-500 text-black`;
    case "spam":
      return `${baseStyle} bg-gray-500 text-white`;
    default:
      return `${baseStyle} bg-indigo-500 text-white`;
  }
};

export default function EmailCard({ email, category }) {
  const sender = email.from.includes("<")
    ? email.from.split("<")[0].trim()
    : email.from;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 overflow-hidden">
          <div
            className="text-base font-semibold text-gray-200 truncate"
            title={sender}
          >
            {sender}
          </div>
          <div
            className="text-sm text-gray-400 truncate"
            title={email.subject}
          >
            {email.subject}
          </div>
        </div>

        <div className="text-xs text-gray-400 shrink-0 ml-4">{email.date}</div>
      </div>

      <p className="mt-3 text-sm text-gray-400 line-clamp-3">{email.snippet}</p>

      {category && (
        <div className="mt-3">
          <span className={getCategoryStyles(category)}>{category}</span>
        </div>
      )}
    </div>
  );
}