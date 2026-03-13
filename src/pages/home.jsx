import React from "react";
import TournamentCard from "../components/TournamentCard.jsx";

export default function Home({ 
  tournaments, 
  sport, 
  onSportChange, 
  searchQuery, 
  onSearchChange, 
  onSelect, 
  onToggleInscription 
}) {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {}
      <div className="bg-white p-4 shadow-sm border-b border-slate-100 sticky top-0 z-10">
        <h1 className="text-xl font-black text-slate-900 mb-4 ml-1">ArenaSync</h1>
        
        {}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un tournoi..."
            className="w-full p-3.5 pl-11 rounded-2xl bg-slate-100 border-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
        </div>
      </div>

      {}
      <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
        {["All", "Badminton", "Basketball", "Boxing"].map((s) => (
          <button
            key={s}
            onClick={() => onSportChange(s)}
            className={`px-5 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              sport === s 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-105" 
                : "bg-white text-slate-500 hover:bg-slate-50 ring-1 ring-slate-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {}
      <div className="px-4 space-y-1">
        <p className="text-[11px] font-bold text-slate-400 uppercase ml-1 mb-3">
          Tournois disponibles ({tournaments.length})
        </p>
        
        {tournaments.length > 0 ? (
          tournaments.map((t) => (
            <TournamentCard 
              key={t.id} 
              tournament={t} 
              onSelect={onSelect} 
              onToggleInscription={onToggleInscription} 
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl mt-4 border-2 border-dashed border-slate-200">
            <span className="text-4xl mb-2">🔎</span>
            <p className="text-slate-500 font-bold">Aucun résultat trouvé</p>
            <p className="text-slate-400 text-xs mt-1">Essayez un autre mot-clé ou sport</p>
            <button 
              onClick={() => {onSearchChange(""); onSportChange("All");}}
              className="mt-4 text-indigo-600 text-xs font-bold underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}