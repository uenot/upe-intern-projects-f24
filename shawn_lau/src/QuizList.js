import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

function QuizList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Retrieve quizzes from session storage
    const storedQuizzes = JSON.parse(sessionStorage.getItem('videoQuizzes')) || [];
    setQuizzes(storedQuizzes);
  }, []);

  const handleQuizClick = (quiz) => {
    // Navigate to the YouTubePlayer page and pass the selected quiz
    navigate('/youtube-player', { state: { VideoQuiz: quiz } }); // Make sure to pass `VideoQuiz`
    window.location.reload(); 
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Back</button>
      <h1>Video Quizzes</h1>
      <div style={styles.grid}>
        {quizzes.map((quiz, index) => (
          <button key={index} style={styles.button} onClick={() => handleQuizClick(quiz)}>
            {quiz.quizName} {/* Display quiz name */}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  button: {
    padding: '20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    transition: 'background-color 0.3s',
  },
};

export default QuizList;
