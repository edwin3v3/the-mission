import React from "react";
import { useState } from "react";

function AddMission() {
  const [mission, setMission] = React.useState("");
  const [missions, setMissions] = React.useState([]);

  const handleAddMission = () => {
    if (mission.trim()) {
      setMissions([...missions, mission]);
      setMission("");
    }
  };

  return (
    <div>
      <h2>Add a New Mission</h2>
      <input
        type="text"
        value={mission}
        onChange={(e) => setMission(e.target.value)}
        placeholder="Enter mission"
      />
      <button onClick={handleAddMission}>Add Mission</button>
      <ul>
        {missions.map((m, index) => (
          <li key={index}>{m}</li>
        ))}
      </ul>
    </div>
  );
}