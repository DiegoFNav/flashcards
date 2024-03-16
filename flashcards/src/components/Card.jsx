import React, { useState } from "react";

const Card = ({cards}) => {
    const cards_new = [...cards];
    const [isFlipped, setIsFlipped] = useState(false);
    const [index, setIndex] = useState(0);
    const [cards_array, setCards] = useState(cards_new);

    const next = () => {
        const nextIndex = (index + 1) % cards_array.length;
        setIndex(nextIndex);
        setIsFlipped(false);
    };

    const previous = () => {
        const previousIndex = (index - 1 + cards_array.length) % cards_array.length;
        setIndex(previousIndex);
        setIsFlipped(false);
    };

    const shuffle = () => {
        console.log("Shuffling cards");
        const shuffledCards = [...cards_array]; // Create a copy of the cards array
        const currentCard = shuffledCards.splice(index, 1)[0]; // Remove the current card
        shuffledCards.sort(() => Math.random() - 0.5); // Shuffle the remaining cards
        shuffledCards.splice(index, 0, currentCard); // Insert the current card back at the original index
        // Set the shuffled cards
        setIndex(index); // Ensure the current card stays intact
        // You can also reset the flipped state if desired
        setIsFlipped(false);
        setCards(shuffledCards);
        //cards = shuffledCards;
    };

    const getBackgroundColor = (category) => {
        const colorMap = {
          easy: "green", // Blue
          medium: "yellow", // Green
          hard: "red", // Red
        };
        return colorMap[category] || "#ffffff";
    };

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
    <div className='card_container'>
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
        <div className="button-container">
            <button onClick={previous}>Back</button>
            <button onClick={next}>Next</button>
            <button onClick={shuffle}>Shuffle</button>
        </div>
    </div>
    );
};

export default Card;