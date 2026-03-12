import React, { useState } from "react";

import TournamentCard from "./components/TournamentCard.jsx";
import ParticipantRow from "./components/ParticipantRow.jsx";
import StatusBadge from "./components/StatusBadge.jsx";
import TabSystem from "./components/TabSystem.jsx";

import { tournamentData } from "./data/tournamentDB.js";


function Icon({ name }) {
  const cls = "h-5 w-5";
  if (name === "search") return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35" /></svg>;
  if (name === "filter") return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M4 6h16M7 12h10M10 18h4" /></svg>;
  if (name === "bell") return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M15 17H9m10-2V11a7 7 0 1 0-14 0v4l-2 2h18l-2-2Z" /></svg>;
  if (name === "chev-left") return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M15 18l-6-6 6-6" /></svg>;
  return null;
}

export default function App() {
  // 1. States lli 7tajina (Data, Sport selected, o l-page lli 7na fiha)
  const [data] = useState(tournamentData);
  const [sport, setSport] = useState("All");
  const [selected, setSelected] = useState(null); // hada howa l-tournament lli klickina 3lih
  const [tab, setTab] = useState("info");

  // 2. Logic dyal l-Filter (Sahl bzzaf)
  const filteredTournaments = data.filter((t) => {
    if (sport === "All") return true;
    return t.sport === sport;
  });

  // 3. Ila klickina 3la tournament (View Details)
  if (selected) {
    const tabs = [
      { id: "info", label: "Info" },
      { id: "participants", label: "Participants" },
    ];

    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header dyal Details */}
        <div className="bg-gradient-to-br from-indigo-600 to-brand-500 p-6 text-white rounded-b-[28px]">
          <button onClick={() => setSelected(null)} className="mb-4 p-2 bg-white/20 rounded-xl">
            <Icon name="chev-left" />
          </button>
          <h1 className="text-2xl font-black">{selected.title}</h1>
          <p className="opacity-80">{selected.sport} • {selected.location}</p>
        </div>

        <div className="p-4 max-w-md mx-auto">
          <TabSystem tabs={tabs} activeId={tab} onChange={setTab} />
          
          <div className="mt-6">
            {tab === "info" && (
              <div className="bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-100">
                <h3 className="font-bold mb-2">About</h3>
                <p className="text-slate-600 text-sm">{selected.description}</p>
              </div>
            )}

            {tab === "participants" && (
              <div className="space-y-3">
                {selected.participants.map((p) => (
                  <ParticipantRow key={p.id} participant={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. Main Page (Home)
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Welcome */}
      <div className="bg-indigo-600 p-6 text-white rounded-b-[28px] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm opacity-80">Welcome back,</p>
            <p className="text-xl font-bold">Samuel Walker!</p>
          </div>
          <Icon name="bell" />
        </div>
        
        {/* Search Bar (Static) */}
        <div className="bg-white rounded-2xl p-3 flex items-center gap-2">
          <Icon name="search" className="text-slate-400" />
          <input className="text-slate-900 text-sm outline-none" placeholder="Search tournaments..." />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto p-4 no-scrollbar">
        {["All", "Badminton", "Basketball", "Boxing"].map((s) => (
          <button
            key={s}
            onClick={() => setSport(s)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition ${
              sport === s ? "bg-indigo-600 text-white" : "bg-white text-slate-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Tournaments List */}
      <div className="p-4 space-y-4 max-w-md mx-auto">
        {filteredTournaments.map((t) => (
          <TournamentCard 
            key={t.id} 
            tournament={t} 
            onSelect={(item) => setSelected(item)} 
          />
        ))}
      </div>
    </div>
  );
}