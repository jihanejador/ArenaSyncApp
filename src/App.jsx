import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import { tournamentData } from "./data/tournameDB.js";

export default function App() {
  const [sport, setSport] = useState("All");
  const [selected, setSelected] = useState(null);

  // Logic dial l-filter
  const filtered = tournamentData.filter(t => sport === "All" || t.sport === sport);

  // Conditional Rendering: Wach n-affichi Home aw Details?
  if (selected) {
    return <Details tournament={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <Home 
      tournaments={filtered} 
      sport={sport} 
      onSportChange={setSport} 
      onSelect={setSelected} 
    />
  );
}