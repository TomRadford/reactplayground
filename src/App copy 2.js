import React, { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const hello = (who) => () => {
    console.log('hello', who)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right"/> 
      {right}
      <History allClicks={allClicks} />
      <Button handleClick={hello('Tom')} text={'hello'}/> 
    </div>
  )
}

const History = ( {allClicks} ) => {
  if (allClicks.length === 0)  {
     return (
      <div>This app is used by pressing buttons</div>
    )
  }  
  return (
    <div>Btn press history: {allClicks.join('+')}</div>
  )

}

const Button = ( {handleClick, text} ) => {
  return (
    <button onClick = {handleClick}>{text}</button>
  )

}

export default App 