import { useState } from 'react';
import MissionList from './components/MissionList'; // <--- ADD THIS LINE
import AddMission from './components/AddMission'; // 

import {BrowserRouter, Route, Routes} from 'react-router'
import Dashboard from './components/Dashboard';

function App() {
  

  return (
    <>
    <BrowserRouter>
      
      <Routes>
        <Route index element={<MissionList />} />
        <Route path="/add-mission" element={<Dashboard />} />
        
        <Route path="/mission-list" element={<MissionList />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App