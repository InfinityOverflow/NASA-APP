// src/App.js
import React from 'react';
import {Routes,Route} from "react-router-dom";
import LandingPage from './components/LandingPage';
import MarsRover from './components/MarsRover';
import Potd from './components/POTD/Potd';
const App = () => {
  return (
      <Routes> 
        <Route path="/" element={<LandingPage/>}  />
        <Route path='/MarsRover' element={<MarsRover/>} />
        <Route path='/POTD' element={<Potd/>}/>
      </Routes> 
    
  );
};

export default App;
