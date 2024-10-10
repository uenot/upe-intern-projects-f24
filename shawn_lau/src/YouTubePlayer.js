import React, { useEffect, useRef, useState } from 'react';

function YouTubePlayer() {
  const playerRef = useRef(null); // Ref to hold the player instance
  const [volume, setVolume] = useState(50); // State to hold volume level

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'MtN1YnoL46Q',
        playerVars: {
          'playsinline': 1,
          'controls': 0,            // Hide controls
          'modestbranding': 1,      // Minimal branding
          'showinfo': 0,            // Do not show video info
          'rel': 0,                 // Do not show related videos at the end
          'disablekb': 1,           // Disable keyboard controls
          'fs': 0,                  // Hide fullscreen button
          'iv_load_policy': 3       // Disable video annotations
        }
      });
    };
  }, []);

  const startVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      playerRef.current.setVolume(volume); // Set to the current volume state
    }
  };

  const stopVideo = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume); // Update the volume dynamically
    }
  };


  return (
    <div>
      <div id="player"></div>
      <button onClick={startVideo}>Start</button>
      <button onClick={stopVideo}>Stop</button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default YouTubePlayer;
