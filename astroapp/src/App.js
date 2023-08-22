// src/App.js
import React from 'react';
import {Routes,Route} from "react-router-dom";
import LandingPage from './components/LandingPage';
import MarsRover from './components/MarsRover';
const App = () => {
  return (
      <Routes> 
        <Route path="/" element={<LandingPage/>}  />
        <Route path='/MarsRover' element={<MarsRover/>} />
      </Routes> 
    
  );
};

export default App;
