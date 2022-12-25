import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Christmas from "../Assets/Icons/x.png"
import html2canvas from "html2canvas";

const Email = () => {
  const printRef = React.useRef();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState(null);
  const [imageObj, setImageObj] = useState("");
  const navigator = useNavigate();

  const setImageF = async (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  }
  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
        await setImageF(event)
        const element = printRef.current;
        const canvas = await html2canvas(element);
        if (canvas){
            const data = canvas.toDataURL('image/jpg');
            setImageObj(data);
        }
    }
  };

  const onTextChange = (e)=>{
    e.preventDefault();
    setMessage(e.target.value);
  }

  const PostData = async () => {
    const bodystr = JSON.stringify({
      email,
      emailBody,
      subject,
      imageObj,
    });
    fetch("http://localhost:5678/send", {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodystr,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data);
        setEmail("");
        setSubject("");
        setEmail("");
        setImage(null);
        setImageObj("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
<div className='Login'>
<div className='Login-left-send'>
    <div>
    <div className='login-home'>
        <img className='login-home-btn' onClick={()=>{
            navigator("/");
        }} src={Christmas} alt="pigshell"/>
    </div>
    <div className='Login-head'>
        <div>Send An Email to your loved ones</div>
    </div>
    </div>
    <div className='Login-card'>
        <form className='Login-form-send'>
            <textarea onChange={onTextChange} maxLength="60" className='Login-input-message' type="text" placeholder="Your Message goes here..."></textarea>
            <input className='Login-input' type="email" placeholder='Enter Email ID' autoComplete='off' id='' value={email} onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            <input className='Login-input' type="text" placeholder='Subject' autoComplete='off' id='' value={subject} onChange={(e)=>{
                setSubject(e.target.value);
            }}/>
            <textarea onChange={(e)=>{
                setEmailBody(e.target.value);
            }} className='Login-input-body' type="text" placeholder="Enter Email Body"></textarea>

            <input className='Login-input' type="file" onChange={onImageChange}></input>

            <button className='Login-button Login-input' type="submit" onClick={() => PostData()} id=''>Send Email</button>
        </form>
    </div>
</div>
<div className='Login-right'>
    {/* <div className='Login-img-container'> */}
    <div className='Login-welcome'>
        <div  className='Login-welcome-border'>
        <div ref={printRef} style={{textAlign:'center'}}>
        {image ? <img src={image} style={{maxHeight:"100px", maxWidth:"140px", margin:"5px"}}></img> : <></>}
        <p className='Login-welcome-p'>{message}</p>
        </div>
        
        </div>
    </div>
    {/* </div> */}
</div>
</div>
  );
};

export default Email;
