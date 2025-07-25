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

}


export default Dashboard;