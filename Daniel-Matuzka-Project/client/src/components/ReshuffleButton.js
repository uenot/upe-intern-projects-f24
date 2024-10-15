import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MoodContext } from '../App';

const ReshuffleButton = () => {
  const { setSongs, currentMood } = useContext(MoodContext);
  const { refetch, isFetching } = useQuery({
    queryKey: ['songs', currentMood],
    queryFn: async () => {
        
      const res = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: currentMood }),
    });
    if (!res.ok) {
        throw new Error('Failed to fetch songs');
    }
    const data = await res.json();
    setSongs(data.songs);
    return data;
    },
    enabled: false
  });

  return (
      <button className='reshuffle-button' onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Reshuffling...' : 'Reshuffle'}
      </button>
  );
};


export default ReshuffleButton;
