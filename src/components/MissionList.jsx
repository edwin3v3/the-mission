import React from 'react';
import { Link } from 'react-router-dom';

function MissionList({ missions, onMissionClick, onUpdateMissionStatus, onUpdateMissionProgress }) {
  const error = null; // Optional placeholder

  if (!missions || missions.length === 0) {
    return <p className="text-[#C9D1D9] text-center py-4">No missions to display.</p>;
  }

  return (
    <div>
      {/* Card view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission) => (
          <div
            key={mission.id || mission.code_name}
            className="bg-[#161B22] p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer border border-[#30363D]"
            onClick={() => onMissionClick(mission)}
          >
            <h3 className="text-xl font-semibold text-[#FDE047] mb-2 truncate">
              {mission.code_name || mission.title || 'Untitled Mission'}
            </h3>
            <p className="text-[#C9D1D9] text-sm mb-1">
              <span className="font-medium text-[#FDE047]">Target:</span>{' '}
              {mission.objective || mission.target || 'N/A'}
            </p>
            <p className="text-[#C9D1D9] text-sm mb-1">
              <span className="font-medium text-[#FDE047]">Status:</span>{' '}
              <span className={`font-bold ${
                mission.mission_status === 'ACTIVE' ? 'text-[#39FF14]' :
                mission.mission_status === 'FAILED' ? 'text-[#FF3131]' :
                'text-[#C9D1D9]'
              }`}>
                {mission.mission_status || mission.status || 'Unknown'}
              </span>
            </p>
            <p className="text-[#C9D1D9] text-sm mb-1">
              <span className="font-medium text-[#FDE047]">Difficulty:</span>{' '}
              <span className={`font-bold ${
                mission.difficulty === 'HIGH' || mission.difficulty === 'EXTREME' ? 'text-[#FF3131]' :
                mission.difficulty === 'MEDIUM' ? 'text-[#FDE047]' :
                mission.difficulty === 'EASY' ? 'text-[#39FF14]' : 'text-[#C9D1D9]'
              }`}>
                {mission.difficulty || mission.priority || 'N/A'}
              </span>
            </p>
            {onUpdateMissionStatus && onUpdateMissionProgress && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <select
                  value={mission.mission_status || mission.status}
                  onChange={(e) => { e.stopPropagation(); onUpdateMissionStatus(mission.id, e.target.value); }}
                  className="p-1 rounded-md bg-[#0D1117] text-[#C9D1D9] border border-[#30363D] text-sm focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="CLASSIFIED">CLASSIFIED</option>
                  <option value="FAILED">FAILED</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                </select>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={mission.progress || 0}
                  onChange={(e) => { e.stopPropagation(); onUpdateMissionProgress(mission.id, parseInt(e.target.value)); }}
                  className="w-20 cursor-pointer accent-[#39FF14]"
                />
                <span className="text-sm text-[#C9D1D9]">{mission.progress || 0}%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Table view */}
      <div className="overflow-x-auto mt-10">
        <Link to="/add-mission" className="text-[#FDE047] hover:underline block mb-4">+ Add New Mission</Link>
        {error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          <table className="min-w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 uppercase text-sm">
                <th className="py-2 px-4">Codename</th>
                <th className="py-2 px-4">Objective</th>
                <th className="py-2 px-4">Difficulty</th>
                <th className="py-2 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {missions.length > 0 ? (
                missions.map((mission) => (
                  <tr
                    key={mission.id}
                    className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                    onClick={() => onMissionClick(mission)}
                  >
                    <td className="py-2 px-4 font-semibold text-white">{mission.title}</td>
                    <td className="py-2 px-4">{mission.objective}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        mission.priority === 'High' ? 'bg-red-600 text-white' :
                        mission.priority === 'Medium' ? 'bg-yellow-600 text-white' :
                        mission.priority === 'Low' ? 'bg-green-600 text-white' : ''
                      }`}>
                        {mission.priority}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <span className={`text-sm font-semibold ${
                        mission.status === 'ACTIVE' ? 'text-green-400' :
                        mission.status === 'COMPLETED' ? 'text-yellow-400' :
                        mission.status === 'FAILED' ? 'text-red-400' : ''
                      }`}>
                        {mission.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
                    No missions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MissionList;
