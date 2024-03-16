import React, { useState } from "react";

const Card = ({cards}) => {
    const cards_new = [...cards];
    const [isFlipped, setIsFlipped] = useState(false);
    const [index, setIndex] = useState(0);
    const [cards_array, setCards] = useState(cards_new);
    const [guess, setGuess] = useState("");
    const [streak, setStreak] = useState(0);
    const [long_streak, setLongStreak] = useState(0);
    const [isCorrectGuess, setIsCorrectGuess] = useState(null);

    const next = () => {
        const nextIndex = (index + 1) % cards_array.length;
        setIndex(nextIndex);
        setIsFlipped(false);
        setGuess("");
        setIsCorrectGuess(null);
    };

    const previous = () => {
        const previousIndex = (index - 1 + cards_array.length) % cards_array.length;
        setIndex(previousIndex);
        setIsFlipped(false);
        setGuess("");
        setIsCorrectGuess(null);
    };

    const shuffle = () => {
        const shuffledCards = [...cards_array];
        const currentCard = shuffledCards.splice(index, 1)[0];
        shuffledCards.sort(() => Math.random() - 0.5);
        shuffledCards.splice(index, 0, currentCard);
        setIndex(index);
        setIsFlipped(false);
        setCards(shuffledCards);
        setIsCorrectGuess(null);
    };

    const checkAnswer = () => {
        const answer = cards[index].answer.toLowerCase();
        if (guess.toLowerCase() === answer) {
            setStreak(streak + 1);
            setLongStreak(Math.max(streak + 1, long_streak));
            setIsCorrectGuess(true);
        } else {
            setStreak(0);
            setIsCorrectGuess(false);
        }
        setGuess("");
    };
    

    const getBackgroundColor = (category) => {
        const colorMap = {
            easy: "green",
            medium: "yellow",
            hard: "red",
        };
        return colorMap[category] || "#ffffff";
    };

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
    <div className='card_container'>
        <h3>Current Streak: {streak}, Longest Streak: {long_streak}</h3>
        <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleCardClick}>
            <div className="card-inner" style={{ backgroundColor: getBackgroundColor(cards_array[index].category) }}>
                <div className="card-face front">
                    {cards_array[index].imageUrl && (
                        <img src={cards_array[index].imageUrl} alt={`Image for ${cards_array[index].question}`}/>
                    )}
                    <h5>{cards_array[index].question}</h5>
                </div>
                <div className="card-face back">
                    <h5>{cards_array[index].answer}</h5>
                </div>
            </div>
        </div>
        <div className="input_container">
            <label htmlFor="guessInput">Guess the answer here: </label>
            <input id="guessInput" type="text" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Place your answer here..." className={isCorrectGuess === true ? "correct" : isCorrectGuess === false ? "incorrect" : ""}/>
            <button onClick={checkAnswer}>Submit</button>
        </div>
        <div className="button_container">
            <button onClick={previous}>Back</button>
            <button onClick={next}>Next</button>
            <button onClick={shuffle}>Shuffle</button>
        </div>
    </div>
    );
};

export default Card;