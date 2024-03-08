import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
      if(password!==confirmedPassword){
        console.log("Password Not Matched")

      }
      else{
        // console.log("username"+username+"pasw"+password+"email"+email);

      const response=await fetch('http://localhost:4000/signup',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:username,password:password,email:email}),
        credentials: "include",
    })
    if (response.ok) {
      // console.log(response);
      console.log('Signup successful!');
    } else {
      console.error('Signup failed');
    }
  }

    // Handle signup logic here
  }

  return (
    <div className="w-1/2 mx-auto my-3.5 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline h-10"
            id="password"
            type={showPassword ? 'text':'password'}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <span className='absolute top-8 right-5'
            onClick={ ()=> setShowPassword( (prev) => !prev ) }>
                {showPassword ? (<AiOutlineEye fill="#124076" size={28}/>): <AiOutlineEyeInvisible fill="#124076" size={28}/>}
          </span>
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline h-10"
            id="confirmPassword"
            type={showConfirmPassword ? 'text':'password'}
            placeholder="Confirm Password"
            onChange={(event) => setConfirmedPassword(event.target.value)}
          />
          <span className='absolute top-8 right-5'
            onClick={ ()=> setShowConfirmPassword( (prev) => !prev ) }>
                {showConfirmPassword ? (<AiOutlineEye fill="#124076" size={28}/>): <AiOutlineEyeInvisible fill="#124076" size={28}/>}
        </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  focus:shadow-outline"
            onClick={handleSignup}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
