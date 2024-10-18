import React, { useState } from 'react';
import './Question.css'; 

function Question({ ques, opt, ans, onCorrectAnswer, onWrongAnswer}) {

    const [selectedOption, setSelectedOption] = useState(null); 
    const [isCorrect, setIsCorrect] = useState(null); 
    const [isAnswered, setIsAnswered] = useState(false); 

    const handleOptionClick = (option) => {
        if (!isAnswered) {
            setSelectedOption(option); 
            setIsCorrect(option === ans); 
            setIsAnswered(true); 

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
                            onClick={() => handleOptionClick(option)} 
                            disabled={isAnswered} 
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
