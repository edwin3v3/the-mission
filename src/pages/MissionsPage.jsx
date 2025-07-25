import React, { useState, useEffect } from 'react';
import MissionList from '../components/MissionList.jsx';
import AddMission from '../components/AddMission.jsx';
import MissionModal from '../components/MissionModal.jsx';

const MISSION_API_URL = "https://mission-server.onrender.com/missions";

function MissionsPage() {
  const [missions, setMissions] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
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

  const fetchMissions = () => {
    fetch(MISSION_API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setMissions(sortedData);
      })
      .catch((err) => {
        console.error("Failed to fetch missions:", err);
        setError("Failed to load missions. Please try again later.");
      });
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleMissionAdded = () => {
    fetchMissions();
    setShowAddForm(false);
  };

  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
    setIsModalOpen(true);
  };

  const updateMissionStatus = async (missionId, newStatus) => {
    try {
      const response = await fetch(`${MISSION_API_URL}/${missionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mission_status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      showMessage("Mission status updated!", 'success');
      fetchMissions();
    } catch (error) {
      console.error("Error updating mission status:", error);
      showMessage("Failed to update status.", 'failure');
    }
  };

  const updateMissionProgress = async (missionId, newProgress) => {
    try {
      const response = await fetch(`${MISSION_API_URL}/${missionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      showMessage("Mission progress updated!", 'success');
      fetchMissions();
    } catch (error) {
      console.error("Error updating mission progress:", error);
      showMessage("Failed to update progress.", 'failure');
    }
  };

  return (
    <div className="p-6 bg-[#0D1117] min-h-full">
      <h1 className="text-4xl font-extrabold text-[#FDE047] mb-6 tracking-wide">MISSION OPERATIONS</h1>

      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${messageType === 'success' ? 'bg-[#39FF14]' : 'bg-[#FF3131]'} text-white`}>
          {message}
        </div>
      )}

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-[#1A5229] hover:bg-[#153F20] text-white font-bold py-2 px-4 rounded-lg mb-6 transition-colors duration-200"
      >
        {showAddForm ? 'Hide Add Mission Form' : '+ Add New Mission'}
      </button>

      {showAddForm && (
        <div className="mb-6">
          <AddMission onMissionAdded={handleMissionAdded} />
        </div>
      )}

      <div className="bg-[#161B22] p-6 rounded-lg shadow-xl border border-[#30363D]">
        <h2 className="text-2xl font-bold text-[#FDE047] mb-4 tracking-wide">ALL MISSIONS</h2>
        {error ? (
          <div className="text-[#FF3131] text-center py-4">{error}</div>
        ) : (
          <MissionList
            missions={missions}
            onMissionClick={handleMissionClick}
            onUpdateMissionStatus={updateMissionStatus}
            onUpdateMissionProgress={updateMissionProgress}
          />
        )}
      </div>

      {isModalOpen && selectedMission && (
        <MissionModal mission={selectedMission} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default MissionsPage;