import React, { useState } from "react";
import TabSystem from "../components/TabSystem.jsx";
import ParticipantRow from "../components/ParticipantRow.jsx";

export default function Details({ tournament, onBack, onToggleInscription }) {
  const [tab, setTab] = useState("info");
  const [formData, setFormData]= useState({name:"",level:""});
  const nameRegex= /^[a-zA-Z\s]{3,20}$/;
  const isNameValid= nameRegex.test(formData.name);
  const isFormValid = isNameValid && formData.level !=="";

  const tabs = [
    { id: "info", label: "Info" },
    { id: "participants", label: "Participants" },
  ];
  const handleConfirm = (e)=>{
    e.preventDefault();
    if(isFormValid){
      onToggleInscription(tournament.id, formData.name);
      setFormData({name:"",level:""});
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-400 p-6 text-white rounded-b-[28px] shadow-lg">
        <button onClick={onBack} className="mb-4 px-4 py-2 bg-white/20 rounded-xl font-bold backdrop-blur-sm">← Back</button>
        <h1 className="text-2xl font-black">{tournament.title}</h1>
        <p className="opacity-90 font-medium">{tournament.sport} • {tournament.location}</p>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <TabSystem tabs={tabs} activeId={tab} onChange={setTab} />
        
        <div className="mt-6">
          {tab === "info" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">Description</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{tournament.description}</p>
              </div>

              {}
              {!tournament.isRegistered ? (
                <div className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4">S'inscrire au tournoi</h3>
                  <form onSubmit={handleConfirm} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nom Complet</label>
                      <input 
                        type="text"
                        placeholder="Ex: Ahmed Alami"
                        className={`w-full mt-1 p-3 rounded-xl border-2 transition-all outline-none ${
                          formData.name === "" ? "border-slate-100" : (isNameValid ? "border-emerald-100 focus:border-emerald-500" : "border-red-100 focus:border-red-500")
                        }`}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      {formData.name !== "" && !isNameValid && (
                        <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">Le nom doit contenir 3 à 20 lettres.</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Niveau</label>
                      <select 
                        className="w-full mt-1 p-3 rounded-xl border-2 border-slate-100 outline-none focus:border-indigo-500 transition-all appearance-none bg-white"
                        value={formData.level}
                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                      >
                        <option value="">Sélectionner un niveau</option>
                        <option value="Beginner">Débutant</option>
                        <option value="Intermediate">Intermédiaire</option>
                        <option value="Pro">Expert / Pro</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full py-3 rounded-xl font-bold transition-all ${
                        isFormValid ? "bg-indigo-600 text-white shadow-indigo-200 shadow-lg active:scale-95" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Confirmer l'inscription
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-red-50 p-5 rounded-2xl border-2 border-red-100 text-center">
                  <p className="text-red-600 font-bold mb-3">Vous êtes déjà inscrit !</p>
                  <button 
                    onClick={() => onToggleInscription(tournament.id)}
                    className="w-full py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-100 active:scale-95"
                  >
                    Se désinscrire
                  </button>
                </div>
              )}
            </div>
          )}

          {tab === "participants" && (
            <div className="space-y-3">
               <p className="text-xs font-bold text-slate-400 uppercase ml-1 mb-2">Liste des participants ({tournament.participants.length})</p>
              {tournament.participants.map((p) => (
                <ParticipantRow key={p.id} participant={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}