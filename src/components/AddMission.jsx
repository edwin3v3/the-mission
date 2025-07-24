import React from "react";
import { useState } from "react";

function AddMission() {
  const [missions, setMissions] = React.useState([]);
  const [formData, setFormData] = useState({
    code_name: "",
    objective: "",
    difficulty: "",
    mission_status: ""
  });

  const sendMission = async (mission) => {
    try {
      const response = await fetch("https://mission-server.onrender.com/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mission),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Mission added successfully:", data);
      setMissions((prevMissions) => [...prevMissions, data]);
    } catch (error) {
      console.error("Failed to add mission:", error);
    }
  };


  return (
    <>
      <div>
        <h2>Add a New Mission</h2>
        <form onSubmit={sendMission}>
          <input
            type="text"
            value={formData.code_name}
            onChange={(e) => { setFormData({ ...formData, code_name: e.target.value }) }}
            placeholder="Enter mission codename"
            required
          />
          <input
            type="text"
            value={formData.objective}
            onChange={(e) => { setFormData({ ...formData, objective: e.target.value }) }}
            placeholder="Enter mission objective"
            required
          />
          <select name="difficulty"

            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          >
            <option value="Extreme">Extreme</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="text"
            value={formData.mission_status}
            onChange={(e) => { setFormData({ ...formData, mission_status: e.target.value }) }}
            placeholder="Enter mission status"
            required
          />

          <button type="submit">Add Mission</button>
        </form>

        <ul>
          {missions.map((m, index) => (
            <li key={index}>{m}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AddMission;

