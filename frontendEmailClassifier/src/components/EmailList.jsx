import React from "react";
import EmailCard from "./EmailCard";

export default function EmailList({ emails = [], classifications = {} }) {
  const grouped = emails.reduce((acc, e) => {
    const cat = classifications[e.id] || "Unclassified";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(e);
    return acc;
  }, {});

  const groups = Object.keys(grouped);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Inbox</h2>
        <div className="text-sm text-gray-400">{emails.length} emails loaded</div>
      </div>

      {emails.length === 0 && (
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg text-center text-gray-400">
          Loading emails or inbox is empty.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((grp) => (
          <div key={grp} className="bg-gray-800/50 p-4 rounded-lg shadow-xl ring-1 ring-white/10">
            <h3 className="text-xl font-semibold mb-4 text-white">
              {grp}
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({grouped[grp].length})
              </span>
            </h3>
            <div className="space-y-4">
              {grouped[grp].map((email) => (
                <EmailCard
                  key={email.id}
                  email={email}
                  category={grp === "Unclassified" ? null : grp}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}