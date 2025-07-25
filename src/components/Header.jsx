import React, { useState, useEffect } from 'react';

function Header() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <header className="bg-[#0D1117] p-4 flex items-center justify-between shadow-lg border-b border-[#30363D] rounded-b-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#FDE047] tracking-widest uppercase"> {/* Larger font, neon yellow */}
                Mission Impossible
            </h1>
            <div className="flex items-center space-x-4">
                <span className="text-3xl font-mono text-[#39FF14] rounded-md">{currentTime}</span> {/* Brighter green */}
                <svg className="w-8 h-8 text-[#C9D1D9] rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
            </div>
        </header>
    );
}

export default Header;