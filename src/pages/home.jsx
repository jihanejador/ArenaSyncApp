import React from "react";
import TournamentCard from "../components/TournamentCard.jsx";

export default function Home({ tournaments, sport, onSportChange, onSelect, onToggleInscription }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {["All", "Badminton", "Basketball", "Boxing"].map((s) => (
          <button
            key={s}
            onClick={() => onSportChange(s)}
            className={`px-4 py-2 rounded-full font-bold ${sport === s ? "bg-indigo-600 text-white" : "bg-white text-slate-600"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {tournaments.map((t) => (
          <TournamentCard 
            key={t.id} 
            tournament={t} 
            onSelect={onSelect} 
            onToggleInscription={onToggleInscription} 
          />
        ))}
      </div>
    </div>
  );
}