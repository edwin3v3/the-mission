import React, { useState } from "react";

const MISSION_API_URL = "https://mission-server.onrender.com/missions";

function AddMission({ onMissionAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    target: "",
    difficulty: "EXTREME",
    status: "ACTIVE",
    description: "",
    agent: ""
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendMission = async (e) => {
    e.preventDefault();
    const payload = {
      code_name: formData.title,
      objective: formData.target,
      difficulty: formData.difficulty,
      mission_status: formData.status,
      description: formData.description,
      agent: formData.agent,
      createdAt: new Date().toISOString()
    };

    console.log("Sending mission payload:", payload);

    try {
      const response = await fetch(MISSION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log("Mission added successfully, response data:", data);

      showMessage("Mission added successfully!", 'success');
      setFormData({ title: "", target: "", difficulty: "EXTREME", status: "ACTIVE", description: "", agent: "" });
      onMissionAdded(data);
    } catch (error) {
      console.error("Error adding mission:", error);
      showMessage(`Failed to add mission: ${error.message}`, 'failure');
    }
  };

  return (
    <div className="bg-[#161B22] p-6 rounded-lg shadow-xl border border-[#30363D] mb-6">
      <h2 className="text-2xl font-bold text-[#FDE047] mb-4 tracking-wide">Add New Mission</h2>

      {message && (
        <div className={`mb-4 p-3 rounded-md shadow-lg ${messageType === 'success' ? 'bg-[#39FF14]' : 'bg-[#FF3131]'} text-white`}>
          {message}
        </div>
      )}

      <form onSubmit={sendMission} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Added mb-4 to each input/select container for spacing */}
        <div className="mb-4 md:mb-0"> {/* Spacing for input fields */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter mission title (Codename)"
            className="p-3 rounded-md bg-[#0D1117] text-[#C9D1D9] border border-[#30363D] focus:outline-none focus:ring-2 focus:ring-[#39FF14] w-full"
            required
          />
        </div>
        <div className="mb-4 md:mb-0">
          <input
            type="text"
            name="target"
            value={formData.target}
            onChange={handleChange}
            placeholder="Enter mission target (Objective)"
            className="p-3 rounded-md bg-[#0D1117] text-[#C9D1D9] border border-[#30363D] focus:outline-none focus:ring-2 focus:ring-[#39FF14] w-full"
            required
          />
        </div>
        <div className="mb-4 md:mb-0">
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#0D1117] text-[#C9D1D9] border border-[#30363D] focus:outline-none focus:ring-2 focus:ring-[#39FF14] w-full"
          >
            <option value="EXTREME">EXTREME</option>
            <option value="HARD">HARD</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="EASY">EASY</option>
          </select>
        </div>
        <div className="mb-4 md:mb-0">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#0D1117] text-[#C9D1D9] border border-[#30363D] focus:outline-none focus:ring-2 focus:ring-[#39FF14] w-full"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLASSIFIED">CLASSIFIED</option>
            <option value="FAILED">FAILED</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
        </div>
        <div className="mb-4 md:mb-0">
          <input
            type="text"
            name="agent"
            value={formData.agent}
            onChange={handleChange}
            placeholder="Assigned Agent (Optional)"
            className="p-3 rounded-md bg-[#0D1117] text-[#C9D1D9] border border-[#30363D] focus:outline-none focus:ring-2 focus:ring-[#39FF14] w-full"
          />
        </div>
        <div className="mb-4 md:mb-0 md:col-span-2"> {/* Textarea takes full width on md screens */}
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mission Description"
            className="p-3 rounded-md bg-[#0D1117] text-[#C9D1D9] border border-[#30363D] focus:outline-none focus:ring-2 focus:ring-[#39FF14] w-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#1A5229] hover:bg-[#153F20] text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 md:col-span-2"
        >
          Add Mission
        </button>
      </form>
    </div>
  );
}

export default AddMission;