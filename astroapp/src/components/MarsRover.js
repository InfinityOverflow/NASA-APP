import React, { useState, useEffect } from 'react';
import './PhotoSlider.css'; 
import Slider from '@mui/material/Slider';
import axios from 'axios';
// require('dotenv').config();
// const api_key=process.env.REACT_APP_API_KEY;
const MarsRover = () => {
  const [rover, setRover] = useState();
  const [sol, setSol] = useState(0);
  const roverNames = ["Perseverance", "Curiosity", "Opportunity", "Spirit"];
  const [maxSol, setMaxSol] = useState([]);
  const [availCams, setCams] = useState([]);
  const [Camera, setCamera] = useState();
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const updatePhotos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${process.env.REACT_APP_API_KEY}&camera=${Camera}`);  
      const pic = res.data.photos.map((obj) => obj.img_src);
      setPics(pic);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % pics.length);
  };

  useEffect(() => {
    setPics([]);
  }, [rover, sol, Camera]);

  useEffect(() => {
    const intervalInMilliseconds = 1000;
    let intervalId;

    if (isPlaying && pics.length > 0) {
      intervalId = setInterval(updateCurrentPhoto, intervalInMilliseconds);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, pics]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSol(value);
  };

  const handleStopClick = () => {
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className='Mars'>
      <div className='rover-btns'>
        {roverNames.map((names) => (
          <button
            key={names}
            value={names}
            onClick={async () => {
              setRover(names);
              try {
                const res = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${names}?api_key=${process.env.REACT_APP_API_KEY}`);
                setMaxSol(res.data.photo_manifest.max_sol);
                setCams(res.data.photo_manifest.photos[0].cameras);
              } catch (error) {
                setMaxSol(100);
              }
            }}
          >
            {names}
          </button>
        ))}
      </div>
      <br />
      {rover?<>
        
      
      <p> Choose from the below Available Cameras</p>
      <div >
        <ul>
        {availCams ? availCams.map((cam) => (
          <li>
          <button className='cameras-btns'
            key={cam}
            value={cam}
            onClick={() => {
              setCamera(cam);
            }}
          >
            {cam}
          </button></li>
        )) : <></>}
        </ul>
        </div>
        {Camera?<>
          <p>Enter Sol (Martian Days) <Slider defaultValue={0} aria-label='Sol' value={sol} onChange={handleChange} step={1} max={maxSol} size='medium' valueLabelDisplay="auto" style={{  width: '300px', marginLeft: '20px', paddingBottom :'0px',marginTop:'10px', color: 'white' }} /></p>
          <div className='Submit' ><button  onClick={updatePhotos}>Submit</button></div>  
          </>:<></>}
      
      
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : pics.length > 0 ? (
          <div className="photo-slider">

            <img src={pics[currentPhotoIndex]} alt={`Photo ${currentPhotoIndex}`} />
            {isPlaying ? (
              <button className='Play-btn' onClick={handleStopClick}>Stop</button>
            ) : (
              <button className='Play-btn' onClick={handlePlayClick}>Play</button>
            )}
          </div>
        ) : (
          <p>No photos to display. Please select a rover, sol, and camera.</p>
        )}
      </div>
        </>:<></>}
    </div>
  );
};

export default MarsRover;
