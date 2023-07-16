import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
function AddUser() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');
    const [msg,setMsg]=useState('')
    const SubmitR = async (e) => {
        if (name === "" || email === "" || phone === ""||address==="") {
          setMsg("Fill the credential");
        } else {
          e.preventDefault();
       const response= await fetch('http://localhost:8080/newuser',{
            method:'POST',
            body:JSON.stringify({name,email,phone,address}),
            headers:{'Content-Type':'application/json'}
          });
          setMsg("");
          setName("");
          setEmail("")
          setAddress("");
          setPhone("");
          console.log(name, email, phone, address);
    
          if(response.status===200){
            setMsg("New User Added Sucessfully");
          }else{
            setMsg("Adding new User Failed");
          }
        }
      };


  return (
    <>
   
    <div className='user'>
  <Link to='/AllUser'><button id='all' className='mainb'>All User</button></Link>  
        
    <div className='user1'>
        <div>
        <label>Name:</label>
        <input type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} value={name}/>
        </div>
        <div>
        <label>Email:</label>
        <input type="email"
                placeholder="Email..."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}/>
        </div>
        <div>
        <label>Phone No:</label>
        <input type='number' placeholder='Phone No'onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}/>
        </div>
        <div>
        <label>Address:</label>
        <input type='text' placeholder='Address' onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}/>
        </div>
        
    </div>
    
    <button className='mainb' onClick={SubmitR}>Submit</button>
    <p className='msg'>{msg}</p>
    
    
</div></>
    
  )
}

export default AddUser