// Login.js

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {

  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword , setShowPassword] = useState(false);

  async function submitHandler(event){
    event.preventDefault();
    const response = await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email, password:password}),
      credentials: "include",
  })
  const res = await response.json();
    if(res.message==="Login Successful"){
      console.log("Login Successful in Login Page");
      // navigate to dashboard or home
      
    }
    else{
      console.log(res);
      console.log("Login Failed in LoginPage");
    }
  }

  return (
    <div className="w-1/2 mx-auto my-3.5 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Login</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {setEmail(event.target.value)}}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={showPassword ? 'text':'password'}
            placeholder="Password"
            value={password}
            onChange={(event)=>{setPassword(event.target.value)}}
          />
          <span className='absolute top-8 right-5'
            onClick={ ()=> setShowPassword( (prev) => !prev ) }>
                {showPassword ? (<AiOutlineEye fill="#124076" size={28}/>): <AiOutlineEyeInvisible fill="#124076" size={28}/>}
        </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={submitHandler}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
