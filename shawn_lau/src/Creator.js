import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Qs from './Qs';
import VideoQuiz from './VideoQuiz';
import './Creator.css';

function Creator() {
    const location = useLocation();
    const navigate = useNavigate();
    const { videoUrl } = location.state || {}; // Get video URL from location state
    const playerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [questions, setQuestions] = useState([]); // Store Q notes
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [quizName, setQuizName] = useState(''); // State for quiz name

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '390',
        width: '640',
        videoId: videoUrl.split('v=')[1] || videoUrl,
        playerVars: {
          'playsinline': 1,
          'controls': 1,
          'modestbranding': 1,
          'showinfo': 0,
          'rel': 0,
          'disablekb': 1,
          'fs': 0,
          'iv_load_policy': 3,
        },
        events: {
          onReady: (event) => {
            setInterval(updateCurrentTime, 1000); // Update current time every second
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Cleanup player on unmount
      }
    };
  }, [videoUrl]);

  const updateCurrentTime = () => {
    if (playerRef.current && playerRef.current.getCurrentTime) {
      const time = playerRef.current.getCurrentTime();
      setCurrentTime(time);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question && options.length && correctAnswerIndex !== null) {
      const newQ = new Qs(currentTime, question, options, options[correctAnswerIndex]);
      setQuestions((prevQuestions) => [...prevQuestions, newQ]);
      // Reset form fields
      setQuestion('');
      setOptions(['', '', '']);
      setCorrectAnswerIndex(null);
    }
  };

  const handlePublish = () => {
    const sortedQuestions = [...questions].sort((a, b) => a.time - b.time); // Sort questions by time
    const videoId = videoUrl.split('v=')[1] || videoUrl; // Extract video ID
    const videoQuiz = new VideoQuiz(videoId, sortedQuestions, quizName); // Pass quiz name to VideoQuiz

    // Store video quiz in session storage
    const quizzes = JSON.parse(sessionStorage.getItem('videoQuizzes')) || [];
    quizzes.push(videoQuiz);
    sessionStorage.setItem('videoQuizzes', JSON.stringify(quizzes));

    alert('Video quiz published successfully!'); // Notification for user

    // Navigate back to the homepage
    navigate('/'); // Navigate to the home page
  };

  return (
    <div>
    <button onClick={() => navigate('/')}>Back</button>
    <h1>Creator Page</h1>
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div id="youtube-player"></div>
        <h2>Current Time: {formatTime(currentTime)}</h2>
        <div className="right-align" style={{ marginLeft: '20px' }}>
            <h3>Create Q Note</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                {options.map((option, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>
                            Option {index + 1}:
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                                style={{ marginLeft: '5px' }}
                            />
                        </label>
                        <label style={{ marginLeft: '10px' }}>
                            <input
                                type="radio"
                                name="correct-answer"
                                checked={correctAnswerIndex === index}
                                onChange={() => setCorrectAnswerIndex(index)}
                            />
                            Correct Answer
                        </label>
                    </div>
                ))}
                
                <button type="submit">Create Q Note</button>
            </form>

            <h3>Quiz Name:</h3>
            <input 
                type="text" 
                value={quizName} 
                onChange={(e) => setQuizName(e.target.value)} 
                required 
            />

            <h3>Created Questions:</h3>
            <ul>
                {questions.map((q, index) => (
                    <li key={index}>
                        {formatTime(q.time)} - {q.ques} (Correct Answer: {q.ans})
                    </li>
                ))}
            </ul>
            
            <button onClick={handlePublish}>Publish Video Quiz</button>
            </div>
        </div>
    </div>
  );
    
}

export default Creator;
