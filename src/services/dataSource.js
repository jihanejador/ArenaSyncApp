import { tournamentData as localTournamentData } from "../data/tournamentDB.js";

const REMOTE_URL =
  "https://simplonline-v3-prod.s3.eu-west-3.amazonaws.com/media/file/txt/data-txt-69a371aa3587e502103050.txt";

function stripLineComments(code) {
  return code.replace(/\/\/.*$/gm, "");
}

function extractTournamentArray(jsText) {
  const cleaned = stripLineComments(jsText);
  const match = cleaned.match(
    /export\s+const\s+tournamentData\s*=\s*(\[[\s\S]*?\]);/m
  );
  if (!match?.[1]) return null;
  // eslint-disable-next-line no-new-func
  return new Function(`return (${match[1]});`)();
}

export async function getTournamentData() {
  try {
    const res = await fetch(REMOTE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const parsed = extractTournamentArray(text);
    if (!Array.isArray(parsed)) throw new Error("Parse failed");
    return parsed;
  } catch {
    return localTournamentData;
  }
}

