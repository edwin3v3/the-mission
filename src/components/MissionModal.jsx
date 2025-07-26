import React from 'react';

function MissionModal({ mission, onClose }) {
  if (!mission) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-[#161B22] p-8 rounded-lg shadow-xl border border-[#30363D] w-full max-w-lg mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#C9D1D9] hover:text-white text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold text-[#FDE047] mb-4 break-words">
          {mission.code_name || mission.title || 'Untitled Mission'}
        </h2>
        <div className="text-[#C9D1D9] text-lg mb-6">
          <p className="mb-2"><span className="font-semibold text-[#FDE047]">Target:</span> {mission.objective || mission.target || 'N/A'}</p>
          <p className="mb-2">
            <span className="font-semibold text-[#FDE047]">Status:</span>{' '}
            <span className={`font-bold ${
              mission.mission_status === 'ACTIVE' ? 'text-[#39FF14]' :
              mission.mission_status === 'FAILED' ? 'text-[#FF3131]' :
              'text-[#C9D1D9]'
            }`}>
              {mission.mission_status || mission.status || 'Unknown'}
            </span>
          </p>
          <p className="mb-2"><span className="font-semibold text-[#FDE047]">Difficulty:</span> {mission.difficulty || mission.priority || 'N/A'}</p>
          <p className="mb-2"><span className="font-semibold text-[#FDE047]">Agent:</span> {mission.agent || 'Unassigned'}</p>
          <p className="mb-2"><span className="font-semibold text-[#FDE047]">Created At:</span> {new Date(mission.createdAt).toLocaleString() || 'N/A'}</p>
          <p className="mb-2"><span className="font-semibold text-[#FDE047]">Progress:</span> {mission.progress || 0}%</p>
        </div>
        <div className="bg-[#0D1117] p-4 rounded-md border border-[#30363D]">
          <h3 className="text-xl font-semibold text-[#FDE047] mb-2">Description:</h3>
          <p className="text-[#C9D1D9] text-base leading-relaxed whitespace-pre-wrap">
            {mission.description || 'No description provided.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MissionModal;