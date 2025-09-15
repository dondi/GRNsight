// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Graph from './components/Graph'
import Sidebar from './components/Sidebar'
import { Grommet } from 'grommet';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const theme = {
    global: {
      colors: {
        text: 'black',
      },
      // font: {
      //   color: 'white',
      // }
    }
  };

  return (
    <div>
      <Grommet theme={theme}>
        <Navbar />
        <Sidebar />
        <Graph />
      </Grommet>
    </div>
  )
}

export default App
