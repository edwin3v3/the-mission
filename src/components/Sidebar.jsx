import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiTarget, FiMessageSquare, FiUsers, FiTool, FiClipboard,
  FiSettings, FiHelpCircle, FiLogOut
} from 'react-icons/fi';

function Sidebar() {
  const navItems = [
    { name: 'Home', icon: <FiHome />, path: '/home' },
    { name: 'Missions', icon: <FiTarget />, path: '/missions' },
    { name: 'Message Log', icon: <FiMessageSquare />, path: '/messages' },
    { name: 'Agents', icon: <FiUsers />, path: '/agents' },
    { name: 'Tools', icon: <FiTool />, path: '/tools' },
    { name: 'Reports', icon: <FiClipboard />, path: '/reports' },
  ];

  const bottomItems = [
    { name: 'Settings', icon: <FiSettings />, path: '/settings' },
    { name: 'Help', icon: <FiHelpCircle />, path: '/help' },
    { name: 'Logout', icon: <FiLogOut />, path: '/logout' },
  ];

  return (
    <aside className="w-64 bg-[#161B22] text-[#C9D1D9] flex flex-col p-4 shadow-lg border-r border-[#30363D] flex-shrink-0">
      <div className="text-3xl font-extrabold text-[#FDE047] mb-8 text-center tracking-wider">
        M:I
      </div>
      <nav className="flex-1">
        <ul className="list-none p-0"> {/* Remove default list styling */}
          {navItems.map((item) => (
            <li key={item.name} className="mb-4"> {/* Increased mb for more space */}
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg text-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#0D1117] text-[#39FF14] border-l-4 border-[#39FF14]'
                      : 'hover:bg-[#30363D] hover:text-white'
                  }`
                }
              >
                <span className="mr-4">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 pt-4 border-t border-[#30363D]">
        <ul className="list-none p-0"> {/* Remove default list styling */}
          {bottomItems.map((item) => (
            <li key={item.name} className="mb-4"> {/* Increased mb for more space */}
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg text-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#0D1117] text-[#FF3131] border-l-4 border-[#FF3131]'
                      : 'hover:bg-[#30363D] hover:text-white'
                  }`
                }
              >
                <span className="mr-4">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;