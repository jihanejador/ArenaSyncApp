import React, { useEffect, useMemo, useState } from "react";
import TournamentCard from "./components/TournamentCard.jsx";
import ParticipantRow from "./components/ParticipantRow.jsx";
import StatusBadge from "./components/StatusBadge.jsx";
import TabSystem from "./components/TabSystem.jsx";
import { getTournamentData } from "./services/dataSource.js";
import { filterBySport, getSports } from "./services/dataFilter.js";

function Icon({ name, className = "" }) {
  const cls = `h-5 w-5 ${className}`;
  if (name === "search") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m21 21-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "filter") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6h16M7 12h10M10 18h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "bell") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M15 17H9m10-2V11a7 7 0 1 0-14 0v4l-2 2h18l-2-2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "chev-left") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M15 18 9 12l6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "share") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M16 8a3 3 0 1 0-2.83-4H13a3 3 0 0 0 3 4Zm-8 7a3 3 0 1 0 2.83 4H11a3 3 0 0 0-3-4Zm0-2a3 3 0 1 0-2.83-4H5a3 3 0 0 0 3 4Zm8.7-6.6-7.4 3.7m7.4 7.9-7.4-3.7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return null;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
          </div>
          <div className="mt-2 h-3 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}

function CategoryBar({ sports, active, onChange, loading }) {
  if (loading) {
    return (
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 animate-pulse rounded-full bg-white/70 ring-1 ring-slate-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {sports.map((s) => {
        const isActive = s === active;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange?.(s)}
            className={[
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ring-1 transition",
              isActive
                ? "bg-brand-600 text-white ring-brand-600"
                : "bg-white text-slate-700 ring-slate-100 hover:bg-slate-50",
            ].join(" ")}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

function BottomNav({ active = "home", onNavigate }) {
  const items = [
    { id: "home", label: "Home" },
    { id: "tournament", label: "Tournament" },
    { id: "profile", label: "Profile" },
  ];
  return (
    <div className="sticky bottom-0 z-10 mt-6 bg-slate-50/80 backdrop-blur">
      <div className="mx-auto max-w-md px-4 pb-4">
        <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-card ring-1 ring-slate-100">
          {items.map((it) => {
            const isActive = it.id === active;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onNavigate?.(it.id)}
                className={[
                  "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-extrabold transition",
                  isActive ? "bg-brand-50 text-brand-700" : "text-slate-500",
                ].join(" ")}
              >
                <span className="h-2 w-2 rounded-full bg-current opacity-40" />
                {it.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DetailsHeader({ tournament, onBack }) {
  return (
    <div className="relative overflow-hidden rounded-b-[28px] bg-gradient-to-br from-brand-700 via-indigo-600 to-brand-500 px-4 pb-6 pt-4 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/40" />
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full border border-white/20" />
        <div className="absolute left-6 top-10 h-2 w-2 rounded-full bg-white/70" />
        <div className="absolute left-12 top-20 h-1.5 w-1.5 rounded-full bg-white/50" />
        <div className="absolute left-20 top-14 h-1 w-1 rounded-full bg-white/60" />
      </div>

      <div className="relative mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/25 backdrop-blur hover:bg-white/25"
          >
            <Icon name="chev-left" className="text-white" />
          </button>
          <p className="text-sm font-bold text-white/90">Tournament</p>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/25 backdrop-blur hover:bg-white/25"
            aria-label="Share"
          >
            <Icon name="share" className="text-white" />
          </button>
        </div>

        <div className="mt-5 flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-slate-900 shadow-sm ring-1 ring-white/60">
            <span className="text-base font-black">
              {String(tournament?.sport || "?").slice(0, 1).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h1 className="truncate text-lg font-black">
                {tournament?.title}
              </h1>
              <StatusBadge value={tournament?.status} kind="tournament" />
            </div>
            <p className="mt-1 text-sm text-white/80">
              {tournament?.participantsCount} Participants • {tournament?.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tournaments, setTournaments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sport, setSport] = useState("All");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("info");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const data = await getTournamentData();
      await new Promise((r) => setTimeout(r, 450));
      if (cancelled) return;
      setTournaments(data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sports = useMemo(() => getSports(tournaments || []), [tournaments]);
  const filtered = useMemo(
    () => filterBySport(tournaments || [], sport),
    [tournaments, sport]
  );

  function openTournament(t) {
    setSelected(t);
    setTab("participants");
  }

  if (selected) {
    const t = selected;
    const tabs = [
      { id: "info", label: "Info" },
      { id: "participants", label: "Participants" },
      { id: "bracket", label: "Bracket" },
    ];

    return (
      <div className="min-h-screen bg-slate-50">
        <DetailsHeader tournament={t} onBack={() => setSelected(null)} />

        <div className="mx-auto -mt-6 max-w-md px-4 pb-10">
          <div className="rounded-[28px] bg-white p-4 shadow-card ring-1 ring-slate-100">
            <TabSystem tabs={tabs} activeId={tab} onChange={setTab} />

            <div className="mt-4">
              {tab === "info" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <p className="text-sm font-extrabold text-slate-900">
                      About
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {t.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["Sport", t.sport],
                      ["Format", t.format],
                      ["Date", t.date],
                      ["Location", t.location],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="rounded-2xl bg-white p-4 ring-1 ring-slate-100"
                      >
                        <p className="text-xs font-extrabold text-slate-500">
                          {k}
                        </p>
                        <p className="mt-1 truncate text-sm font-black text-slate-900">
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "participants" && (
                <div>
                  <p className="text-sm font-black text-slate-900">
                    Participants List ({t.participants?.length || 0})
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    {(t.participants || []).map((p) => (
                      <ParticipantRow key={p.id} participant={p} />
                    ))}
                    {(t.participants || []).length === 0 && (
                      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-100">
                        No participants yet.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {tab === "bracket" && (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-100">
                  Bracket view is not provided in the dataset yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative overflow-hidden rounded-b-[28px] bg-gradient-to-br from-brand-700 via-indigo-600 to-brand-500 px-4 pb-6 pt-6 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/40" />
          <div className="absolute -left-10 top-10 h-64 w-64 rounded-full border border-white/20" />
          <div className="absolute right-10 top-12 h-2 w-2 rounded-full bg-white/70" />
          <div className="absolute right-16 top-20 h-1.5 w-1.5 rounded-full bg-white/50" />
          <div className="absolute right-24 top-14 h-1 w-1 rounded-full bg-white/60" />
        </div>

        <div className="relative mx-auto max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white/85">
                Good Morning,
              </p>
              <p className="text-xl font-black">Samuel Walker!</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/25 backdrop-blur hover:bg-white/25"
                aria-label="Notifications"
              >
                <Icon name="bell" className="text-white" />
              </button>
              <img
                alt="Profile"
                src="https://i.pravatar.cc/80?u=profile"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/60"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white/95 px-3 py-3 text-slate-700 shadow-sm ring-1 ring-white/50">
              <Icon name="search" className="text-slate-400" />
              <input
                className="w-full bg-transparent text-sm font-semibold placeholder:text-slate-400 focus:outline-none"
                placeholder="Search"
                disabled
              />
            </div>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/25 backdrop-blur hover:bg-white/25"
              aria-label="Filter"
            >
              <Icon name="filter" className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md px-4 pb-2 pt-5">
        <CategoryBar
          sports={sports}
          active={sport}
          onChange={setSport}
          loading={loading}
        />
      </div>

      <div className="mx-auto max-w-md px-4 pb-6">
        <div className="grid grid-cols-1 gap-4">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading &&
            filtered.map((t) => (
              <TournamentCard
                key={t.id}
                tournament={t}
                onSelect={openTournament}
              />
            ))}

          {!loading && filtered.length === 0 && (
            <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 ring-1 ring-slate-100">
              No tournaments for this sport.
            </div>
          )}
        </div>
      </div>

      <BottomNav active="home" onNavigate={() => {}} />
    </div>
  );
}

