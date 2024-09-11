import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function New() {

  const navigateTo = useNavigate();
  let [email,setemail]=useState('')
  let [pass,setpass]=useState('')
  
 



 function inputemail(e){
  setemail(e.target.value);
  console.log(email)
 }

 function inputpass(e){
  setpass(e.target.value);
  console.log(pass)
 }



const submitinput = async (event) => {
  
  event.preventDefault();

  try {
      const response = await axios.post("http://127.0.0.1:3005/login", { email:email, password:pass });
    

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        window.location.href = '/dashboard';
      }


  } catch (error) {
      if (error.response) {
          console.error('Server responded with non-2xx status:', error.response.data);
      } else {
          console.error('Error occurred:', error.message);
      }
  }
};


  return (
    <div className='w-[50px] h-[30px] bg-blue-600 h-screen w-full   '>

<div className="bg-background-light dark:bg-background-dark h-screen w-full mt-20 absolute" >
      <div className='bg-blue-400 w-[30rem] h-[30rem] ml-[30%] rounded-2xl' >
       
        <div className="flex justify-center items-center h-fit">
          <div className="flex flex-col items-start">
            <div className="text-4xl text-black">Admin Dashboard</div>
            <div className="text-login-subtitle-light dark:text-login-subtitle-dark mt-6">
              Enter your email and password to sign in
            </div>
            <label className="dark:text-white text-text-color-primary-light mt-6">
              Email
            </label>
            <input
              placeholder="Email"
              className="w-full rounded font-thin px-5 py-3 mt-4"
              autoFocus
              type="email"
              required
              onChange={inputemail}
            />
            <label className="dark:text-white text-text-color-primary-light mt-6">
              Password
            </label>
            <input
              placeholder="Password"
              id="password"
              className="w-full rounded font-thin px-5 py-3 mt-4"
              autoFocus
              type="password"
              required
              onChange={inputpass}
              
            />
        
            <button
              className="text-white bg-pink-600 h-16 rounded-xl w-full text-xl mt-10"
              type="submit" onClick={submitinput}
            >
              Sign In
            </button>
          
          </div>
        </div>
      </div>
    </div>


    </div>
  )
}
