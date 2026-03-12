import React from "react";
import TournamentCard from "../components/TournamentCard.jsx";


function Icon({ name }) {
  const cls = "h-5 w-5";
  if (name === "search") return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35" /></svg>;
  if (name === "bell") return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M15 17H9m10-2V11a7 7 0 1 0-14 0v4l-2 2h18l-2-2Z" /></svg>;
  return null;
}

export default function Home({ tournaments, sport, onSportChange, onSelect }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {}
      <div className="bg-indigo-600 p-6 text-white rounded-b-[28px] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm opacity-80">Welcome back,</p>
            <p className="text-xl font-bold">Samuel Walker!</p>
          </div>
          <Icon name="bell" />
        </div>
        <div className="bg-white rounded-2xl p-3 flex items-center gap-2 text-slate-400">
          <Icon name="search" />
          <span className="text-sm">Search tournaments...</span>
        </div>
      </div>

      {}
      <div className="flex gap-2 overflow-x-auto p-4 no-scrollbar">
        {["All", "Badminton", "Basketball", "Boxing"].map((s) => (
          <button
            key={s}
            onClick={() => onSportChange(s)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition ${
              sport === s ? "bg-indigo-600 text-white" : "bg-white text-slate-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {}
      <div className="p-4 space-y-4 max-w-md mx-auto">
        {tournaments.map((t) => (
          <TournamentCard key={t.id} tournament={t} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}