import { useState } from 'react'
import './App.css'

function App() {
  const [side, setSide] = useState(0);
  const [index, setIndex] = useState(0);

  const cards = [["question 1", "answer 1"], ["question 2", "answer 2"], ["question 3", "answer 3"]]

  function flip() {
    if (side === 0) {
      setSide(1);
    } else {
      setSide(0);
    }
  }

  function next() {
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * cards.length);
    } while (randomIndex === index);
    console.log(randomIndex);
    setIndex(randomIndex);
    setSide(0);
  }


  return (
    <>
      <div className='main_container'>
        <h1>The Ultimate Plant</h1>
        <h3>How good it is</h3>
        <h3>Number of cards:</h3>
        <div className='card_container'>
          <button className='card' onClick={flip}>
            <div>
              <h3>{cards[index][side]}</h3>
            </div>
          </button>
          <button onClick={next}>Next</button>
        </div>
      </div>
    </>
  )
}

export default App
