import './App.css';
import YouTubePlayer from './YouTubePlayer';
import Question from './Question';

function App() {
  return (
    <div>
      <div>
        
        <h1>YouTube Player</h1>
        <YouTubePlayer videoId={'MtN1YnoL46Q'} stopTimes={[5,10]}/>
        

      </div>

      
      <div>
        <Question ques={"Question: why"} opt={["options1", "options2", "options3", "options4"]} ans={"options1"} />
      </div>

    </div>
    
    
  );
}

export default App;
