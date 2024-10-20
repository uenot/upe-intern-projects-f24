import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MoodContext } from '../App';

const MoodButton = ({ face, mood }) => {
  const { setSongs, setCurrentMood } = useContext(MoodContext);

  const { refetch, isLoading, isError } = useQuery({
    queryKey: ['songs', mood],
    queryFn: async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mood }),
        });
  
        if (!res.ok) {
          throw new Error('Failed to fetch songs');
        }
  
        const data = await res.json();
        setSongs(data.songs);
        setCurrentMood(mood);
        return data.songs;

      } catch (error) {
        console.error(error);
      } 
    },
    enabled: false
  });

  const handleClick = () => {
    refetch();
  };

  return (
    <button className='btn' onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : isError ? 'Error!' : face}
    </button>
  );
};

export default MoodButton;
