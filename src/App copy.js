import React, { useState } from 'react'


const Display = ({ counter }) => {
  return (
    <>{counter}</>
  )
};

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const countUp = () => setCounter(counter+1)
  const countReset = () => setCounter(0)
  const countDown = () => setCounter(counter-1)
  return (
    <div>
     <p> 
      <Display counter={counter} />
      <Button 
        onClick={countUp} 
        text={'+'} 
      />
      <Button 
        onClick={countDown} 
        text={'-'} 
      />
      <Button 
        onClick={countReset} 
        text={'reset'}
      />
      </p>
    </div>
  )
}

export default App 