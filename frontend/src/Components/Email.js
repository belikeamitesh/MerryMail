import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Christmas from "../Assets/Icons/x.png"

const Email = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState(null);
  const [imageObj, setImageObj] = useState("");
  const navigator = useNavigate();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setImageObj(reader.result);
      };
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const PostData = () => {
    const bodystr = JSON.stringify({
      email,
      message,
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
<div className='Login-left'>
    <div className='login-home'>
        <img className='login-home-btn' onClick={()=>{
            navigator("/");
        }} src={Christmas} alt="pigshell"/>
    </div>
    <div className='Login-head'>
        <div>Send An Email to your loved ones</div>
        <div className='Login-subhead'>
            Enter The Following Details
        </div>
    </div>
    <div className='Login-card'>
        <form className='Login-form'>
            <input className='Login-input' type="email" placeholder='Enter Your Email ID' autoComplete='off' id='' value={email} onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            <input className='Login-input' type="text" placeholder='Subject' autoComplete='off' id='' value={subject} onChange={(e)=>{
                setSubject(e.target.value);
            }}/>
            <input className='Login-input' type="text" placeholder='Enter Message' autoComplete='off' id='' value={message} onChange={(e)=>{
                setMessage(e.target.value);
            }}/>
             <input className='Login-input' type="text" placeholder='Type "yes" for adding border' autoComplete='off' id='' value={message} onChange={(e)=>{
                setMessage(e.target.value);
            }}/>
             <input className='Login-input' type="text" placeholder='Type "yes" for adding shadow' autoComplete='off' id='' value={message} onChange={(e)=>{
                setMessage(e.target.value);
            }}/>
            <input className='Login-input' type="file" onChange={onImageChange}></input>

            <button className='Login-button Login-input' type="submit" onClick={() => PostData()} id=''>Send Email</button>
        </form>
    </div>
</div>
<div className='Login-right'>
    {/* <div className='Login-img-container'> */}
    <div className='Login-welcome'>
        {image ? <img src={image} alt="logo" style={{height:"350px"}}></img> : <></>}
    </div>
    <div style={{color:"white", paddingTop:"120px"}}>
        <p>{message}</p>
    </div>
    {/* </div> */}
</div>
</div>
  );
};

export default Email;
