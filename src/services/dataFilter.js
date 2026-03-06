export function getSports(tournaments) {
  const set = new Set();
  for (const t of tournaments || []) {
    if (t?.sport) set.add(t.sport);
  }
  return ["All", ...Array.from(set)];
}



