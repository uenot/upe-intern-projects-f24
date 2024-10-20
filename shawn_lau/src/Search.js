import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(''); 
  const [videoId, setVideoId] = useState('');
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };
    loadYouTubeAPI();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
    setError(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const idPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = inputValue.match(idPattern);
    const videoId = match ? match[1] : inputValue;

    if (match) {
      setVideoId(videoId);
      setIsVideoVisible(true);
      setInputValue(''); 
      setError('');
    } else {
      setError('Please enter a valid YouTube link.'); 
    }
  };

  const handleConfirm = () => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; 
    navigate('/creator', { state: { videoUrl } }); 
    window.location.reload();
  };

  const createYouTubePlayer = () => {
    if (window.YT) {
      if (window.player) {
        window.player.destroy();
      }
      window.player = new window.YT.Player('youtube-player', {
        height: '390',
        width: '640',
        videoId: videoId,
        events: {
          onReady: (event) => event.target.playVideo(),
          onError: (error) => console.error('Error playing video:', error),
        },
      });
    }
  };

  useEffect(() => {
    if (isVideoVisible && videoId) {
      createYouTubePlayer();
    }
  }, [isVideoVisible, videoId]);

  return (
    <div>
      <button onClick={() => navigate('/')}>Back</button> 
      <h1>Search Page</h1>
      <p>This is the Search page!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter YouTube link..."
        />
        <button type="submit">Submit</button> 
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} 

      {isVideoVisible && (
        <div>
          <h2>Video:</h2>
          <div id="youtube-player"></div>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </div>
  );
}

export default Search;
