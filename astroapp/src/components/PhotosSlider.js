import React, { useState, useEffect } from 'react';
import './PhotoSlider.css'; // Assuming you have the CSS file for styling

const PhotoSlider = ({ pictures, intervalInSeconds }) => {
  const [photos,setPhotos]=useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const updatePhotos=()=>{
    if(pictures)
    setPhotos(pictures);
    console.log(photos);
    //console.log(pictures);
  }
  const updateCurrentPhoto = () => {
    
    updatePhotos();
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  useEffect(() => {
    const intervalInMilliseconds = intervalInSeconds * 1000;

    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(updateCurrentPhoto, intervalInMilliseconds);
    }

    return () => clearInterval(intervalId);
  }, [intervalInSeconds, isPlaying]);

  const handleStopClick = () => {
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="photo-slider">
      <img src={photos[currentPhotoIndex]} alt={`Photo ${currentPhotoIndex}`} />
      {isPlaying ? (
        <button onClick={handleStopClick}>Stop</button>
      ) : (
        <button onClick={handlePlayClick}>Play</button>
      )}
    </div>
  );
};

export default PhotoSlider;
