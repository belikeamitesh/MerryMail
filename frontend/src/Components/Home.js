import React from 'react'
import "../Css/Home.css";
import Camera from "../Assets/camera.png"
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigator = useNavigate();
  return (
    <div className='Home'>
       <div className='Home-left'>
           <div className='Home-head'>
           Wanna send customized <span className='highlight-text'>Christmas Cards</span> to loved ones?
           </div>
           <div className='Home-subhead'>
               You're in the right place. Try out our card-generator app.
           </div>
           <div className='Home-ctas' >
               <div className='Home-img-conv' onClick={()=>{
             navigator("/send");
           }}>Make your card</div>
           </div>
       </div> 
       <div className='Home-right'>
           <img src={Camera} alt="camera"/>
       </div> 
    </div>
  )
}

export default Home