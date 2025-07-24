import React from "react";
import { useState } from "react";

function AddMission() {
    const [missions, setMissions] = React.useState([]);
    const [formData, setFormData] = useState({
        codeName: "",
        objective: "",
        priority: "",
        misson_status: ""
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
    <div>
      <h2>Add a New Mission</h2>
      <form onSubmit={sendData}>
        <input
          type="text"
          value={codeName}
          onChange={(e) => {setFormData({...formData, codeName: e.target.value})}}
          placeholder="Enter mission codename"
          required
        />
        <input
          type="text"
          value={objective}
          onChange={(e) => {setFormData({...formData, objective: e.target.value})}} 
            placeholder="Enter mission objective"
          required 
        />
        <select       value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select priority</option>
          <option value="High">High</option>    
            <option value="Medium">Medium</option>      
            <option value="Low">Low</option>
                    </select>
        <input
          type="text"
          value={mission_status}
          onChange={(e) => {setFormData({...formData, mission_status: e.target.value})}}
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
  );
}

export default AddMission;

