import React from "react";
import { useState } from "react";

const url = "https://mission-server.onrender.com/missions";

function AddMission() {
  const [missions, setMissions] = React.useState([]);
  const [formData, setFormData] = useState({
    code_name: "",
    objective: "",
    difficulty: "",
    mission_status: ""
  });


   const sendMission = (e) =>{
    e.preventDefault();

    fetch(url, {
      method: "POST",
      body:JSON.stringify(formData),
      headers:{"Content-Type": "application/json"}
    })
      .then(res => res.json())
      .then((data)=>{
        setFormData({code_name:"", objective:""});
        const newArr = [...missions, data]
        setMissions(newArr);
      })
  }


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
            <option value="EXTREME">Extreme</option>
            <option value="HARD">HARD</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="EASY">EASY</option>
          </select>
        <select name="mission_status"

            value={formData.mission_status}
            onChange={(e) =>
              setFormData({ ...formData, mission_status: e.target.value })
            }
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLASSIFIED">CLASSIFIED</option>
            <option value="FAILED">FAILED</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>

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

