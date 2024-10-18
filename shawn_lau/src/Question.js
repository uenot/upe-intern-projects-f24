import React, { useState } from 'react';
import './Question.css'; 

function Question({ ques, opt, ans, onCorrectAnswer, onWrongAnswer}) {

    const [selectedOption, setSelectedOption] = useState(null); // To track selected option
    const [isCorrect, setIsCorrect] = useState(null); // To track if answer is correct
    const [isAnswered, setIsAnswered] = useState(false); // Track if the question is answered

    const handleOptionClick = (option) => {
        if (!isAnswered) {
            setSelectedOption(option); // Set the selected option
            setIsCorrect(option === ans); // Check if it's the correct answer
            setIsAnswered(true); // Mark the question as answered

            if(option === ans) {
                onCorrectAnswer();
            }
            else {
                onWrongAnswer();
            }
        }
    };

    return (
        <div className="question-container">
            
            <p className="question-text">{ques}</p>
            <ul className="option-list">
                {opt.map((option, index) => (
                    <li key={index} className="option-item">
                        <button 
                            className={`option-button ${selectedOption === option ? 'selected' : ''} ${isAnswered ? 'disabled' : ''}`}
                            onClick={() => handleOptionClick(option)} // Handle button click
                            disabled={isAnswered} // Disable button after the question is answered
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedOption && (
                <p className="answer-result">
                    {isCorrect ? 'Correct!' : 'Incorrect!'} The correct answer is: {ans}
                </p>
            )}
        </div>
    );
}

export default Question;
