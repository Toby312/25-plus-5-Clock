import './App.css';
import React, {useState, useEffect} from 'react'
function App() {
  const[breakLength, setBreakLength] = useState(5)
  const[sessionLength, setSessionLength] = useState(25)
  const[play, setPlay] = useState(false)
  const [timingLabel, setTimingLabel] = useState("SESSION")
  const [timeLeft, setTimeLeft] = useState(1500)
  const [timeLeftColor, setTimeLeftColor] = useState("first-color")


  const handleBreakIncrement = ()=>{
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }

  const handleBreakDecrement = ()=>{
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }

  const handleSessionIncrement = ()=>{
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)

    }
  }

  const handleSessionDecrement = ()=>{
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  }

  const title = timingLabel === "SESSION" ? "Session" : "Break"

  const formatTime = () =>{
  const minutes = Math.floor(timeLeft/60)
  const seconds = timeLeft - (minutes * 60)
  const formattedSeconds = seconds < 10 ? '0' + seconds: seconds
  const formattedMinutes = minutes < 10 ? '0' + minutes: minutes
  return `${formattedMinutes}:${formattedSeconds}`
  }

  const timeout = setTimeout(()=>{
    if(timeLeft && play){
      setTimeLeft(timeLeft - 1)
    }
  }, 1000)

  const handlePlay =() =>{
    clearTimeout(timeout)
    setPlay(!play)
  }

  const resetTimer = () =>{
    const audio = document.getElementById("beep")
    if(!timeLeft && timingLabel === "SESSION"){
      setTimeLeft(breakLength * 60)
      setTimingLabel("Break")
      audio.play()
    }
    if(!timeLeft && timingLabel === "Break"){
      setTimeLeft(sessionLength * 60)
      setTimingLabel("SESSION")
      audio.pause()
      audio.currentTime = 0
    }
  }


  const clock = () =>{
    if(play){
      resetTimer()
    } else{
      clearTimeout(timeout)
    }
  }

  useEffect(()=>{
    clock()
    
  })

  if(timingLabel === 1500){
    setTimeLeftColor("second-color")
  }

  const handleReset =()=> {
    clearTimeout(timeout)
    setPlay(false)
    setTimeLeft(1500)
    setSessionLength(25)
    const audio = document.getElementById("beep")
    audio.pause()
    audio.currentTime = 0
  }

  const space = " "
  return (
    <div id ='container'>
    <div>
      <h2>25 + 5 Clock</h2>

      <div>
        <strong id='break-label'>Break Length</strong>
        {space}
        <strong id='session-label'>Session Length</strong>
      </div>
      <div className ='upper-control'>
      <button id='break-decrement' disabled={play} onClick={handleBreakDecrement}>-</button>
      <strong id='break-length'>
        {breakLength}
      </strong>
      <button id='break-increment' disabled={play}  onClick={handleBreakIncrement}>+</button>
      <strong id='space'>{space}</strong>

        <button id='session-decrement'  disabled={play} onClick={ handleSessionDecrement}>-</button>
        <strong id='session-length'>
         {sessionLength}
      </strong>
      <button id='session-increment' disabled={play} onClick={ handleSessionIncrement}>+</button>
      </div>
      <div className='time-container'>
        <h4 id='timer-label'>{title}</h4>
      
        <h4 id='time-left' className={timeLeftColor}>{formatTime()}</h4>
        </div>

          <div>
      <button id='start_stop' onClick={handlePlay}>start/stop</button>
      {space}  
      <button id='reset' onClick={handleReset}>reset</button>
      </div>
      </div>
     
    <audio
    id='beep'
    preload='auto'
    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>
  
  );
}

export default App;
