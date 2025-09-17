// import { useState } from 'react'
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
        control: {
          "transparent": "transparent"
        }
      },
      focus: {
        border: {
          color: 'transparent'
        }
      },
    },
    button: {
      active: {
        default: {
          border: {
            color: 'transparent'
          }
        },
        border: {
          color: 'transparent'
        },
      },
      border: {
        radius: '0px',
        color: 'transparent',
      },
    },
    dropButton: {
      active: {
        default: {
          border: {
            color: 'transparent'
          }
        },
        border: {
          color: 'transparent'
        },
      },
      border: {
        radius: '0px',
        color: 'transparent',
      },
    }
  };

  return (
    <Grommet theme={theme} full>
      <Navbar />
      <Sidebar />
      <Graph />
    </Grommet>
  )
}

export default App
