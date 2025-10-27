import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-lg px-6 py-4 flex justify-between items-center ring-1 ring-white/10">
      <Link to="/" className="text-xl font-semibold text-white">
        MagicSlides Email Classifier
      </Link>
      <div className="space-x-2">
        <Link
          to="/"
          className="px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}