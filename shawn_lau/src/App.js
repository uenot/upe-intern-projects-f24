import './App.css';
import YouTubePlayer from './YouTubePlayer';
import VideoQuiz from './VideoQuiz';
import Qs from './Qs';

function App() {


  const question1 = new Qs(2, "What the duck doing!", ["Walking", "Talking", "Eating", "Sleeping"], "Sleeping");
  const question2 = new Qs(4, "What the duck color", ["Yellow", "Purple", "Green", "Orange"], "Yellow");
  const quizzy = new VideoQuiz('MtN1YnoL46Q', [question1, question2]);


  return (
    <div>
      <div>
        
        <h1>YouTube Player</h1>
        <YouTubePlayer VideoQuiz= {quizzy} />
        

      </div>

      
      
    </div>
    
    
  );
}

export default App;
