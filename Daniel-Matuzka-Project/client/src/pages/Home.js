import React from 'react';
import MoodButton from '../components/MoodButton';

const Home = () => {
  return (
    <div className='main-section'>
      <div className='button-panel'>
        <MoodButton face={<i className="fa-regular fa-face-smile"></i>} />
        <MoodButton face={<i className="fa-regular fa-face-frown"></i>} />
        <MoodButton face={<i className="fa-regular fa-face-angry"></i>} />
      </div>
    </div>
  )
}

export default Home
