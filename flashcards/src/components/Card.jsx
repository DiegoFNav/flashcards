import React, { useState } from "react";

const Card = ({cards}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [index, setIndex] = useState(0);

    function next() {
        let randomIndex = 0;
        do {
            randomIndex = Math.floor(Math.random() * cards.length);
        } while (randomIndex === index);
        setIndex(randomIndex);
        console.log(randomIndex);
        if (isFlipped) {
            setIsFlipped(false);
        }
    }

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
            <div className="card-inner" style={{ backgroundColor: getBackgroundColor(cards[index].category) }}>
                <div className="card-face front">
                    {cards[index].imageUrl && (
                        <img src={cards[index].imageUrl} alt={`Image for ${cards[index].question}`}/>
                    )}
                    <h5>{cards[index].question}</h5>
                </div>
                <div className="card-face back">
                    <h5>{cards[index].answer}</h5>
                </div>
            </div>
        </div>
        <button className='next' onClick={next}>Next</button>
    </div>
    );
};

export default Card;