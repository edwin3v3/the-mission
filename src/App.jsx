import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import MissionsPage from './pages/MissionsPage.jsx';
import MessageLogPage from './pages/MessageLogPage.jsx';
import AgentsPage from './pages/AgentsPage.jsx';
import ToolsPage from './pages/ToolsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

function App() {
  return (
    <div className="app-container flex flex-col min-h-screen bg-[#0D1117] text-[#C9D1D9]"> {/* Removed font-mono here */}
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/messages" element={<MessageLogPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<div className="p-6"><h1 className="text-4xl font-extrabold text-[#FDE047] mb-6 tracking-wide">SETTINGS</h1><div className="bg-[#161B22] p-6 rounded-lg shadow-xl border border-[#30363D]"><p className="text-[#C9D1D9]">Settings will be managed here.</p></div></div>} />
            <Route path="/help" element={<div className="p-6"><h1 className="text-4xl font-extrabold text-[#FDE047] mb-6 tracking-wide">HELP</h1><div className="bg-[#161B22] p-6 rounded-lg shadow-xl border border-[#30363D]"><p className="text-[#C9D1D9]">Help documentation will be available here.</p></div></div>} />
            <Route path="/logout" element={<div className="p-6"><h1 className="text-4xl font-extrabold text-[#FDE047] mb-6 tracking-wide">LOGOUT</h1><div className="bg-[#161B22] p-6 rounded-lg shadow-xl border border-[#30363D]"><p className="text-[#C9D1D9]">Logging out...</p></div></div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;