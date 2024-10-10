import React from 'react';
import './Question.css'; // Make sure to import the CSS file

function Question({ ques, opt, ans }) {
    return (
        <div className="question-container">
            <p className="question-text">{ques}</p>
            <ul className="option-list">
                {opt.map((option, index) => (
                    <li key={index} className="option-item">{option}</li>
                ))}
            </ul>
            <p className="answer-text">Correct Answer: {ans}</p>
        </div>
    );
}

export default Question;
