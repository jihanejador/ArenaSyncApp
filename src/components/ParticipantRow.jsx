import StatusBadge from "./StatusBadge.jsx";

export default function ParticipantRow({ participant }) {
  const p = participant;
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm ring-1 ring-slate-100">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={p.avatar}
          alt={p.name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-slate-900">
            {p.name}
          </p>
          <p className="text-xs text-slate-500">{p.id}</p>
        </div>
      </div>
      <StatusBadge value={p.status} kind="participant" />
    </div>
  );
}

