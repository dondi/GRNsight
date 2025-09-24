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
        text: '#333',
        control: {
          "transparent": "transparent"
        }
      },
      font: {
        family: 'Helvetica Neue, Helvetica, Arial, sans-serif'
      },
      focus: {
        border: {
          color: 'transparent'
        }
      },
      input: {
        font: {
          size: "small"
        }
      }
    },
    text: {
      font: {
        family: 'Helvetica Neue',
      },
      medium: {
        size: '14px',
        height: '20px',
      }
    },
    button: {
      active: {
        default: {
          border: {
            width: '0px',
          }
        },
      },
      border: {
        width: '0px',
      },
    },
    fileInput: {
      message: {
        size: 'xsmall'
      },
      border: {
        style: 'solid',
        color: 'light-4',
        radius: '2px'
      },
      hover: {
        background: {
          color: 'light-1',
        },
        border: {
          style: 'solid',
          color: 'light-4'
        },
      },
    },
  };

  return (
    <Grommet theme={theme} background={{ color: "white", dark: false }} full>
      <Navbar />
      <Sidebar />
      <Graph />
    </Grommet>
  )
}

export default App
