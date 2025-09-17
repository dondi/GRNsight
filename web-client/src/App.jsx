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
      input: {
        font: {
          size: "small"
        }
      }
    },
    button: {
      active: {
        default: {
          border: {
            color: 'transparent'
          }
        },
        // border: {
        //   color: 'transparent'
        // },
      },
      border: {
        radius: '0px',
        color: 'transparent',
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
          color: 'light-1'
        },
        border: {
          style: 'solid',
          color: 'light-4'
        },
      },
    },
    // dropButton: {
    //   active: {
    //     default: {
    //       border: {
    //         color: 'transparent'
    //       }
    //     },
    //     border: {
    //       color: 'transparent'
    //     },
    //   },
    //   border: {
    //     radius: '0px',
    //     color: 'transparent',
    //   },
    // }
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
