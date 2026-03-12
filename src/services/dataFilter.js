export function getSports(tournaments) {
  const set = new Set();
  for (const t of tournaments || []) {
    if (t?.sport) set.add(t.sport);
  }
  return ["All", ...Array.from(set)];
}

export function filterBySport(tournaments, sport) {
  if (!sport || sport === "All") return tournaments;
  return (tournaments || []).filter((t) => t.sport === sport);
}