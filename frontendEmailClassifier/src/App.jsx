import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import OpenAIKeyInput from "./components/OpenAIKeyInput";
import GoogleLoginButton from "./components/GoogleLoginButton";
import EmailList from "./components/EmailList";
import { fetchMockEmails } from "./utils/mockEmails";
import { classifyEmailsAPI, fetchEmailsAPI } from "./services/api";

export default function App() {
  const [openAiKey, setOpenAiKey] = useState(
    localStorage.getItem("OPENAI_KEY") || ""
  );
  const [emails, setEmails] = useState([]);
  const [classifications, setClassifications] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mocks = fetchMockEmails(15);
    setEmails(mocks);
  }, []);

  const handleSaveKey = (key) => {
    localStorage.setItem("OPENAI_KEY", key);
    setOpenAiKey(key);
  };

  const handleFetchEmails = async () => {
    setLoading(true);
    try {
      // this will call backend to fetch real Gmail emails later
      const fetched = await fetchEmailsAPI();
      if (fetched && fetched.length) setEmails(fetched);
    } catch (err) {
      console.error("fetch emails failed:", err);
      // we keep mock emails if backend not set up
    } finally {
      setLoading(false);
    }
  };

  const handleClassify = async () => {
    setLoading(true);
    try {
      const key = localStorage.getItem("OPENAI_KEY");
      if (!key) return alert("Please enter & save your OpenAI API key first.");

      // call backend classify endpoint; backend expects emails + openai key
      const resp = await classifyEmailsAPI({ emails, openAiKey: key });
      // expected shape: { classifications: { <emailId>: "Important" } }
      if (resp?.classifications) setClassifications(resp.classifications);
    } catch (err) {
      console.error("classification failed:", err);
      alert("Classification failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <p className="text-sm text-gray-500 mb-3">
                Sign in to Google to allow fetching emails (backend required).
              </p>
              <GoogleLoginButton />
              <hr className="my-3" />
              <button
                onClick={handleFetchEmails}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Fetching..." : "Fetch Last 15 Emails"}
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <OpenAIKeyInput initialKey={openAiKey} onSave={handleSaveKey} />
              <button
                onClick={handleClassify}
                className="mt-3 w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Classifying..." : "Classify Emails (GPT)"}
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <EmailList emails={emails} classifications={classifications} />
          </div>
        </div>
      </main>
    </div>
  );
}
