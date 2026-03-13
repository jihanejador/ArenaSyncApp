import StatusBadge from "./StatusBadge.jsx";

function SportIcon({ sport }) {
  const s = String(sport || "").trim();
  const letter = s ? s[0].toUpperCase() : "?";
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-slate-800 shadow-sm ring-1 ring-white/60">
      <span className="text-sm font-bold">{letter}</span>
    </div>
  );
}

export default function TournamentCard({ tournament, onSelect, onToggleInscription }) {
  const t = tournament;

  const handleRegister = (e) => {
    
    e.stopPropagation(); 
    onToggleInscription(t.id);
  };

  return (
    <div
      onClick={() => onSelect?.(t)}
      className="group w-full text-left cursor-pointer mb-4"
    >
      <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-start gap-3">
          <SportIcon sport={t.sport} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-[15px] font-extrabold text-slate-900">{t.title}</h3>
              <StatusBadge value={t.status} kind="tournament" />
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500">{t.description}</p>
          </div>
        </div>

        {}
        <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-slate-600">
          <div className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${t.isRegistered ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span className="truncate font-medium">
              {}
              {t.participants.length} / {t.maxParticipants} Participants
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 text-slate-400 font-medium">
             <span className="truncate">{t.location}</span>
          </div>
        </div>

        {}
        <button
          type="button"
          onClick={handleRegister}
          className={`mt-4 w-full rounded-xl py-2.5 text-sm font-bold transition shadow-sm active:scale-95 ${
            t.isRegistered 
              ? "bg-red-500 text-white hover:bg-red-600 shadow-red-100" 
              : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100"
          }`}
        >
          {t.isRegistered ? "Se désinscrire" : "S'inscrire"}
        </button>
      </div>
    </div>
  );
}