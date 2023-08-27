import axios from 'axios';
import React, { useEffect, useState, } from 'react'
const api_key=process.env.REACT_APP_API_KEY;


function Potd() {
  const [date,setDate]=useState();
    const getDate=()=>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today=yyyy+'-'+mm+'-'+dd;
        console.log(today);
        setDate(today);   
    }
    
    const [pic,setPic]=useState();
    const [content,setContent]=useState();
    const [flag,setFlag]=useState(0);
    const getPOTD=async ()=>{
       const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&thumbs=True`);     //set up .then and .catch blocks
       setContent(res.data.explanation);
       setPic(res.data.hdurl);
       console.log(res);
    }
    useEffect(()=>{
      getPOTD();
    },[])
  return (
    <div>
    {/*getDate()*/}
  
      <h1>POTD</h1>
      <img src={pic} alt="Picture of the day"/>
      <p>{content}</p>
    </div>
  )
}

export default Potd
