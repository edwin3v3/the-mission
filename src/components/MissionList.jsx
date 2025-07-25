import React from 'react';

function MissionList({ missions, onMissionClick, onUpdateMissionStatus, onUpdateMissionProgress }) {
  if (!missions || missions.length === 0) {
    return <p className="text-[#C9D1D9] text-center py-4">No missions to display.</p>;
  }

  return (
<div className="overflow-x-auto">
      <Link to={'/add-mission'}></Link>

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
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold
                        ${mission.priority === 'High' ? 'bg-red-600 text-white' : ''}
                        ${mission.priority === 'Medium' ? 'bg-yellow-600 text-white' : ''}
                        ${mission.priority === 'Low' ? 'bg-green-600 text-white' : ''}`}
                    >
                      {mission.priority}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right">
                    <span
                      className={`text-sm font-semibold
                        ${mission.status === 'ACTIVE' ? 'text-green-400' : ''}
                        ${mission.status === 'COMPLETED' ? 'text-yellow-400' : ''}
                        ${mission.status === 'FAILED' ? 'text-red-400' : ''}`}
                    >
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
  );
}

export default MissionList;