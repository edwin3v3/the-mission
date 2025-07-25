import React from 'react';
import Dashboard from '../components/Dashboard.jsx';

function HomePage() {
  return (
    <div className="p-6 bg-[#0D1117] min-h-full">
      <h1 className="text-4xl font-extrabold text-[#FDE047] mb-6 tracking-wide">HOME DASHBOARD</h1>
      <Dashboard />
    </div>
  );
}

export default HomePage;