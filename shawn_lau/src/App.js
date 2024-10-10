import './App.css';
import YouTubePlayer from './YouTubePlayer';
import Question from './Question';

function App() {
  return (
    <div>
      <div>
        
        <h1>YouTube Player</h1>
        <YouTubePlayer />
        

      </div>

      
      <div>
        <Question ques={"Question: why"} opt={["options1", "options2", "options3", "options4"]} ans={"answer"} />
      </div>

    </div>
    
    
  );
}

export default App;
