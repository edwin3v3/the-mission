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
          throw new Error(`HTTP error! status: ${res.status}`);
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

      {/* Mission Status Panel - Top Right */}
      <div className="bg-[#161B22] rounded-lg shadow-xl p-4 border border-[#30363D] lg:col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-[#FDE047]">MISSION STATUS</h2>
        <div className="grid grid-cols-3 gap-4 text-center text-lg font-semibold">
          <div>
            <p className="text-[#C9D1D9]">ACTIVE</p>
            <p className="text-4xl text-[#39FF14] font-mono">{activeMissions}</p>
          </div>
          <div>
            <p className="text-[#C9D1D9]">COMPLETED</p>
            <p className="text-4xl text-[#C9D1D9] font-mono">{completedMissions}</p>
          </div>
          <div>
            <p className="text-[#C9D1D9]">FAILED</p>
            <p className="text-4xl text-[#FF3131] font-mono">{failedMissions}</p>
          </div>
        </div>
      </div>

      {/* Intelligence Status Panel - Bottom Left */}
      <div className="bg-[#161B22] rounded-lg shadow-xl p-4 border border-[#30363D] lg:col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-[#FDE047]">INTELLIGENCE STATUS</h2>
        <ul className="space-y-3 text-lg">
          <li className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#39FF14] mr-3 animate-pulse"></span>
            Encrypted message decoded. <span className="ml-auto text-[#39FF14]">ACTIVE</span>
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#C9D1D9] mr-3"></span>
            Rendezvous set at the safe house.
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#C9D1D9] mr-3"></span>
            Awaiting further orders <span className="ml-auto text-[#C9D1D9]">COMPLETED</span>
          </li>
        </ul>
      </div>

      {/* Intelligence File Panel - Bottom Right (no map) */}
      <div className="bg-[#161B22] rounded-lg shadow-xl p-4 border border-[#30363D] lg:col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-[#FDE047]">INTELLIGENCE FILE</h2>
        <div className="bg-[#FF3131] text-white text-sm font-bold px-3 py-1 rounded-md inline-block mb-3">TOP SECRET</div>
        <p className="text-lg leading-relaxed text-[#C9D1D9]">
          Encrypted message decoded. Rendezvous set at safe house. Awaiting further orders.
          The target's last known location was a secure facility in the outskirts.
          Further reconnaissance is required before proceeding with extraction.
          Ensure all communication channels remain encrypted.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;