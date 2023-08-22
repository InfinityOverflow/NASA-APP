import axios from 'axios';
import React, { useState } from 'react'
const api_key=process.env.REACT_APP_API_KEY;

function Potd() {
    const getDate=()=>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today=yyyy+'-'+mm+'-'+dd;
        console.log(today);
        
    }
    const [pic,setPic]=useState();
    const getPOTD=async ()=>{
       const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);     //set up .then and .catch blocks
       console.log(res);
       
    }



  return (
    <div>
    {getDate()}
      <h1>POTD</h1>
    </div>
  )
}

export default Potd
