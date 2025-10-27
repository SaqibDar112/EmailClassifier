import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GEMINI_KEY = "geminiKey";
const EMAIL_CACHE_KEY = "userEmails";

const Dashboard = () => {
  const [emails, setEmails] = useState(() => {
    const cachedEmails = localStorage.getItem(EMAIL_CACHE_KEY);
    return cachedEmails ? JSON.parse(cachedEmails) : [];
  });

  const [classified, setClassified] = useState({});
  const [loading, setLoading] = useState(emails.length === 0);
  const [classifying, setClassifying] = useState(false);
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [refetching, setRefetching] = useState(false);

  const navigate = useNavigate();

  const fetchEmails = async (manual = false) => {
    if (manual) setRefetching(true);
    else setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/emails/fetch`, {
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          navigate("/");
        }
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      setEmails(data);
      localStorage.setItem(EMAIL_CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching emails:", err);
    } finally {
      setLoading(false);
      setRefetching(false);
    }
  };

  useEffect(() => {
    if (emails.length === 0) {
      fetchEmails();
    }
  }, []);

  useEffect(() => {
    const key = localStorage.getItem(GEMINI_KEY);
    setHasGeminiKey(!!key);
  }, []);

  const handleClassify = async () => {
    setClassifying(true);

    const userKey = localStorage.getItem(GEMINI_KEY);
    if (!userKey) {
      alert("Gemini API key missing. Please set it before classifying.");
      setClassifying(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/emails/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emails, userKey }),
      });

      const sortedData = await res.json();

      const categoryMap = sortedData.reduce((acc, item) => {
        acc[item.id] = item.category;
        return acc;
      }, {});

      const categoryOrder = {
        Important: 1,
        Promotions: 2,
        Social: 3,
        Marketing: 4,
        General: 5,
        Spam: 6,
      };

      const newSortedEmails = [...emails].sort((a, b) => {
        const catA = categoryMap[a.id] || "General";
        const catB = categoryMap[b.id] || "General";
        const orderA = categoryOrder[catA] || 99;
        const orderB = categoryOrder[catB] || 99;
        return orderA - orderB;
      });

      setEmails(newSortedEmails);
      setClassified(categoryMap);
      localStorage.setItem(EMAIL_CACHE_KEY, JSON.stringify(newSortedEmails));
    } catch (err) {
      console.error("Error classifying emails:", err);
    }

    setClassifying(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(GEMINI_KEY);
    localStorage.removeItem(EMAIL_CACHE_KEY);
    window.location.href = "http://localhost:5000/auth/logout";
  };

  const handleSetGeminiKey = () => {
    const newKey = prompt("Enter your Gemini API key:");
    if (newKey && newKey.trim().length > 5) {
      localStorage.setItem(GEMINI_KEY, newKey);
      setHasGeminiKey(true);
      alert("Gemini key saved successfully!");
    } else {
      alert("Please enter a valid Gemini API key.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-300">Loading emails...</p>;

  return (
    <div className="container mx-auto p-6">
      <div
        className={`mb-4 p-3 rounded-lg text-sm font-medium flex justify-between items-center ${
          hasGeminiKey
            ? "bg-green-900 text-green-200 border border-green-700"
            : "bg-yellow-900 text-yellow-200 border border-yellow-700"
        }`}
      >
        <span>
          {hasGeminiKey
            ? "✅ Gemini Key Saved"
            : "⚠️ Gemini Key Missing — Please Add Key"}
        </span>
        <button
          onClick={handleSetGeminiKey}
          className={`text-sm font-semibold underline ${
            hasGeminiKey ? "text-green-300" : "text-yellow-300"
          }`}
        >
          {hasGeminiKey ? "Update Key" : "Add Key"}
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-white">Inbox Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleClassify}
          disabled={classifying || !hasGeminiKey}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {classifying ? "Classifying..." : "Classify Emails"}
        </button>

        <button
          onClick={() => fetchEmails(true)}
          disabled={refetching}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:bg-gray-500"
        >
          {refetching ? "Refreshing..." : "Re-fetch Emails"}
        </button>
      </div>

      <ul className="space-y-4">
        {emails.map((email) => (
          <li
            key={email.id}
            className="border border-gray-700 p-4 rounded-lg bg-gray-800 shadow-sm hover:shadow-md hover:bg-gray-700 transition-all"
          >
            <h3 className="font-semibold text-lg text-white">{email.subject}</h3>
            <p className="text-sm text-gray-400">{email.from}</p>
            <p className="text-gray-300 mt-2">{email.snippet}</p>

            {classified[email.id] && (
              <span className="mt-3 inline-block bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {classified[email.id]}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;