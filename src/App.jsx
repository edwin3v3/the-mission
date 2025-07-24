import { useState } from 'react';
import MissionList from './components/MissionList'; // <--- ADD THIS LINE

function App() {
  const [count, setCount] = useState(0) // You might not need 'count' if it's not used elsewhere

  return (
    <>
      <MissionList/> 
    </>
  )
}

export default App