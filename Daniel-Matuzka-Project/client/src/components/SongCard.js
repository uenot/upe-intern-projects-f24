import React from 'react';

const SongCard = ({ song }) => {
  return (
    <div className="song-card">
      <img src={song.image} alt={`${song.name} album cover`} className="song-image" />
      <p className="song-name">{song.name}</p>
      <p className="song-artist">{song.artist}</p>
    </div>
  );
};

export default SongCard;