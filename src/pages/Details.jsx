import React, { useState } from "react";
import TabSystem from "../components/TabSystem.jsx";
import ParticipantRow from "../components/ParticipantRow.jsx";

export default function Details({ tournament, onBack }) {
  const [tab, setTab] = useState("info");
  const tabs = [
    { id: "info", label: "Info" },
    { id: "participants", label: "Participants" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-brand-500 p-6 text-white rounded-b-[28px]">
        <button onClick={onBack} className="mb-4 p-2 bg-white/20 rounded-xl">Back</button>
        <h1 className="text-2xl font-black">{tournament.title}</h1>
        <p className="opacity-80">{tournament.sport} • {tournament.location}</p>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <TabSystem tabs={tabs} activeId={tab} onChange={setTab} />
        <div className="mt-6">
          {tab === "info" && (
            <div className="bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-100">
              <p className="text-slate-600 text-sm">{tournament.description}</p>
            </div>
          )}
          {tab === "participants" && (
            <div className="space-y-3">
              {tournament.participants.map((p) => (
                <ParticipantRow key={p.id} participant={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}