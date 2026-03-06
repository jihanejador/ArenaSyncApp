export default function StatusBadge({ value, kind = "tournament" }) {
  const v = String(value || "").trim();

  const map =
    kind === "participant"
      ? {
          Confirmed:
            "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
          Pending: "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
        }
      : {
          "On Going": "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
          Upcoming: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
          Pending: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
        };

  const cls =
    map[v] || "bg-slate-100 text-slate-700 ring-1 ring-slate-200";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        cls,
      ].join(" ")}
    >
      {v || "—"}
    </span>
  );
}

