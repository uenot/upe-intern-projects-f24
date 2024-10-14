import React, { useContext } from 'react';
import MoodButton from '../components/MoodButton';
import SongCard from '../components/SongCard';
import ReshuffleButton from '../components/ReshuffleButton';
import { MoodContext } from '../App';

const Home = () => {
  const { songs, currentMood } = useContext(MoodContext);

  return (
    <div className='main-section'>
      <p className='greeting'>Hi, how are you feeling today?</p>
      <div className='button-panel'>
        <MoodButton face={<i className="fa-regular fa-face-smile"></i>} mood="happy" />
        <MoodButton face={<i className="fa-regular fa-face-frown"></i>} mood="sad" />
        <MoodButton face={<i className="fa-regular fa-face-angry"></i>} mood="angry" />
      </div>
      <div className='song-list'>
        {songs.map((song, index) => (
          <SongCard key={index} song={song} />
        ))}
      </div>
      {currentMood && songs.length > 0 && (
        <ReshuffleButton />
      )}
    </div>
  );
};

export default Home;
