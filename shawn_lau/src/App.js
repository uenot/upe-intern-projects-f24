// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import YouTubePlayer from './YouTubePlayer';
import Search from './Search'; 
import VideoQuiz from './VideoQuiz';
import Creator from './Creator';
import Qs from './Qs';
import QuizList from './QuizList';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/search">
        <button>Go to Search</button>
      </Link>
      <Link to="/quiz-list">
        <button>Quiz!</button>
      </Link>    
    </div>
  );
}

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/youtube-player" element={<YouTubePlayer />} />
        <Route path="/search" element={<Search />} /> 
        <Route path="/creator" element={<Creator />} /> 
        <Route path="/quiz-list" element = {<QuizList />} />
      </Routes>
    </Router>
  );
}

export default App;
