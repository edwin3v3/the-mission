import React, { useState, useEffect } from 'react';
import MissionList from './MissionList.jsx';

const MISSION_API_URL = "https://mission-server.onrender.com/missions";

function Dashboard() {
  const [missions, setMissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(MISSION_API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(HTTP error! status: ${ res.status });
        }
        return res.json();
      })
      .then((data) => {
        // Sort missions by createdAt descending for recent first
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setMissions(sortedData);
      })
      .catch((err) => {
        console.error("Failed to fetch missions for dashboard:", err);
        setError("Failed to load dashboard missions. Please try again later.");
      });
  }, []);

    const activeMissions = missions.filter(m => m.mission_status === 'ACTIVE').length;
  const completedMissions = missions.filter(m => m.mission_status === 'CLASSIFIED' || m.mission_status === 'COMPLETED').length;
  const failedMissions = missions.filter(m => m.mission_status === 'FAILED').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Mission Log Panel - Top Left */}
      <div className="bg-[#161B22] rounded-lg shadow-xl p-4 border border-[#30363D] lg:col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-[#FDE047]">MISSION LOG</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b border-[#30363D] text-[#C9D1D9]">
                <th className="py-2 pr-4 text-sm">CODENAME</th>
                <th className="py-2 pr-4 text-sm">OBJECTIVE</th>
                <th className="py-2 pr-4 text-sm">DIFFICULTY</th>
                <th className="py-2 text-sm">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {missions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500 text-sm">No missions to display.</td>
                </tr>
              ) : (
                missions.slice(0, 5).map(mission => (
                  <tr key={mission.id || mission.code_name} className="border-b border-[#30363D] last:border-b-0">
                    <td className="py-2 pr-4 text-sm">{mission.code_name || 'N/A'}</td>
                    <td className="py-2 pr-4 text-sm">{mission.objective || 'N/A'}</td>
                    <td className="py-2 pr-4 text-sm">{mission.difficulty || 'N/A'}</td>
                    <td className={`py-2 pr-4 text-sm ${
                      mission.mission_status === 'ACTIVE' ? 'text-[#39FF14]' :
                      mission.mission_status === 'FAILED' ? 'text-[#FF3131]' :
                      'text-[#C9D1D9]' // For CLASSIFIED/SUSPENDED
                    }`}>
                      {mission.mission_status || 'Unknown'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>






      

      </div>

  )

}


export default Dashboard;