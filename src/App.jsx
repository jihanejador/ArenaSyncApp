import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import { tournamentData } from "./data/tournamentDB.js";

export default function App() {
  
  const [tournaments, setTournaments] = useState(tournamentData);
  const [sport, setSport] = useState("All");
  const [selectedId, setSelectedId] = useState(null); 

  
  const handleToggleInscription = (id, userName = "Moi") => {
  setTournaments(prev =>
    prev.map(t => {
      if (t.id === id) {
        if (!t.isRegistered) {
          
          const newParticipant = {
            id: "user-" + Date.now(),
            name: userName, 
            status: "Confirmed",
            avatar: `https://i.pravatar.cc/150?u=${userName}`
          };
          return { ...t, isRegistered: true, participants: [...t.participants, newParticipant] };
        } else {
          
          return { ...t, isRegistered: false, participants: t.participants.filter(p => !p.id.startsWith("user-")) };
        }
      }
      return t;
    })
  );
};

  const selectedTournament = tournaments.find(t => t.id === selectedId);
  
  
  const filtered = tournaments.filter(t => sport === "All" || t.sport === sport);

 
  if (selectedId && selectedTournament) {
    return (
      <Details
        tournament={selectedTournament}
        onBack={() => setSelectedId(null)}
        onToggleInscription={handleToggleInscription} 
      />
    );
  }

  
  return (
    <Home
      tournaments={filtered}
      sport={sport}
      onSportChange={setSport}
      onSelect={(t) => setSelectedId(t.id)}
      onToggleInscription={handleToggleInscription}
    />
  );
}