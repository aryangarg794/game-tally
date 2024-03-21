import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'



function App() {
  const THRESHOLD = 120
  const GAMETIME = 240
  const GUIDE_PERIOD = 1000 * 30

  const [countPlayer, setCountPlayer] = useState(100)
  const [countGuide, setCountGuide] = useState(100)
  const [showWin, setShowWin] = useState(false)
  const [gameStarted, setGameStart] = useState(false)
  const [boolWinPlayer1, setBoolWin1] = useState(false)
  const [boolWinPlayer2, setBoolWin2] = useState(false)
  const [timer, setTimer] = useState(GAMETIME)
  

  function determineWin(exit) {
    switch (exit) {
      case 'comparison':
        if (countPlayer > countGuide) {
          setBoolWin1(true)
        } else if (countGuide == countPlayer) {
          setBoolWin1(true)
          setBoolWin2(true)
        } else {
          setBoolWin2(true)
        }
        break;
      case 'combination':
        if (countPlayer + countGuide >= THRESHOLD) {
          setBoolWin1(true)
          setBoolWin2(true)
        } 
        break;
      case 'timeout':
        setBoolWin1(false)
        setBoolWin2(false)
        break;
      default:
        console.log("nothing happened")
    }
    setShowWin(true)
    setGameStart(false)
    
  }

  function startTimer() {
    setGameStart(true)
    setTimeout(determineWin, GAMETIME * 1000, 'timeout')

    const interval = setInterval(() => {
      setTimer((timer) => timer -1)
    }, 1000)

    const intervalGuide = setInterval(() => {
      setCountGuide((count) => count - 10)
    }, GUIDE_PERIOD)
    
    setTimeout(() => {
      clearInterval(interval)
      clearInterval(intervalGuide)
    }, GAMETIME * 1000) 
  }

  function reset() {
    setShowWin(false)
    setBoolWin1(false)
    setBoolWin2(false)
    setCountGuide(100)
    setCountPlayer(100)
    setGameStart(false)
    setTimer(GAMETIME)
  }

  function getWin(player1win, player2win) {
    if (player1win & player2win) {
      return "BOTH PLAYERS WIN"
    }
    else if (player1win & !player2win) {
      return "THE PLAYER WINS"
    } 
    else if (!player1win & player2win) {
      return "THE GUIDE WINS"
    }
    else {
      return "BOTH PLAYERS LOSE"
    }
  }

  function getColor(player1win, player2win) {
    if (player1win & player2win) {
      return "text-green-700"
    }
    else if (player1win & !player2win) {
      return "text-blue-700"
    } 
    else if (!player1win & player2win) {
      return "text-purple-700"
    }
    else {
      return "text-red-700"
    }
  }

  return (
    <>
    <div className='flex flex-col gap-[200px] items-center justify-center'>
      <h1 className='font-sans text-6xl font-bold'> Game Tally for Game</h1>
      <div className={`${showWin ? 'block' : 'hidden'} text-6xl font-bold ${getColor(boolWinPlayer1, boolWinPlayer2)}`}> {showWin ? getWin(boolWinPlayer1, boolWinPlayer2) : null} </div>
      <button class={`${gameStarted ? 'hidden' : 'visible'} text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      onClick={() => startTimer()}>
        Start 
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
      <div className={`text-6xl text-black rounded-2xl border-4 border-black ${gameStarted ? 'visible' : 'hidden'}`}> 
        <div class="rounded-[calc(1.5rem-1px)] p-10 bg-white dark:bg-gray-900">
          {timer} 
        </div> 
      </div>
      <div className="font-sans text-xl flex font-semibold flex-row gap-[100px]">
      <div className='flex flex-row gap-[2px]'>
        <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => setCountPlayer((count) => count - 5)}>
          Player has {countPlayer} points
        </button>
        <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => setCountPlayer((count) => count + 10)}>
          ＋
        </button>
      </div>
      <div className='flex flex-row gap-[2px]'>
      <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => setCountGuide((count) => count - 20)}>
         Guide has {countGuide} points
      </button>
      <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => setCountGuide((count) => count + 10)}>
         +
      </button>
      </div>
      </div>
      <div className="font-sans text-xl flex font-semibold flex-row gap-[100px]">
        <button class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        onClick={() => determineWin('comparison')}>
          Game finished with Exit 1
        </button>
        <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => reset()}>
          Reset
        </button>
        <button class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        onClick={() => determineWin('combination')}>
          Game finished with Exit 2
        </button>
      </div>
    </div>
    </>
  )
}

export default App
