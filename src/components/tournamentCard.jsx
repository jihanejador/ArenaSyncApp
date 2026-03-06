

function SportIcon({ sport }) {
  const s = String(sport || "").trim();
  const letter = s ? s[0].toUpperCase() : "?";
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-slate-800 shadow-sm ring-1 ring-white/60">
      <span className="text-sm font-bold">{letter}</span>
    </div>
  );
}

export default function TournamentCard({ tournament, onSelect }) {
  const t = tournament;
  return (
    <button
      type="button"
      onClick={() => onSelect?.(t)}
      className="group w-full text-left"
    >
      <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-start gap-3">
          <SportIcon sport={t.sport} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-[15px] font-extrabold text-slate-900">
                {t.title}
              </h3>
              <StatusBadge value={t.status} kind="tournament" />
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {t.description}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-slate-600">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
            <span className="truncate">
              {t.participantsCount} Participants • {t.type}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
            <span className="truncate">{t.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
            <span className="truncate">{t.date}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
            <span className="truncate">{t.location}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

