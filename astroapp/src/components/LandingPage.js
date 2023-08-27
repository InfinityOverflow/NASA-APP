import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './LandingPage.css'; 

const ImageCard = ({ title, url }) => (
  <>
  <div className="image-card">
    <img src={url} alt={title} />
    </div>
    <h3>{title}</h3>
  </>

  
);

const LandingPage = () => {
  // Placeholder hardcoded image URLs
  const hardcodedImages = [
    // {
    //   title: 'Futuristic Spacecraft',
    //   url: 'https://via.placeholder.com/300',
    //   navto : 'emty',
    // },
    {
      title: 'Mars Rover',
      url: 'https://c4.wallpaperflare.com/wallpaper/272/567/734/curiosity-mars-rover-wallpaper-preview.jpg',
      navto : 'MarsRover',
    },
    {
      title: 'Picture Of the Day',
      url: 'https://via.placeholder.com/300',
      navto : 'emty',
    },
  ];

  const [images, setImages] = useState([]);

  useEffect(() => {
    // Simulate API call by setting the hardcoded images
    setImages(hardcodedImages);
  }, []);

  return (
    <div className="landing-page">
      <h1>Welcome to my NASA API Project</h1>
      <div className="image-container">
      {images.map((image, index) => (
        <NavLink className='NavLink' to={`/${image.navto}`}><ImageCard key={index} title={image.title} url={image.url} /></NavLink>
      ))}
      </div>
    </div>
  );
};

export default LandingPage;
