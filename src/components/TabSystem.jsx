export default function TabSystem({ tabs, activeId, onChange }) {
  return (
    <div className="rounded-2xl bg-white/30 p-1 ring-1 ring-white/30 backdrop-blur">
      <div className="grid grid-cols-3 gap-1">
        {tabs.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange?.(t.id)}
              className={[
                "rounded-2xl px-3 py-2 text-sm font-bold transition",
                active
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-white/80 hover:text-white",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

