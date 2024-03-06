// Login.js

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const LoginPage = ({loginHandler}) => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handler = async () => {
    try {
      const user = await loginHandler(email, password,setToken);
      // console.log(user)

      if (document.cookie.includes("Login")) {
        // Redirect to the home page for regular users
        console.log("hello");
        // window.location.href = "/";
        navigate('/');
      } else if (user && user.role === "admin") {
        // Redirect to the admin page for admin users
        // window.location.href = "/";
        navigate('/');
      } else {
        // Handle unexpected user data or role
        console.error("Unexpected user data or role");
      }

      window.location.reload();


    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure if needed
    }
  };

  return (
    <div className="w-1/2 mx-auto my-3.5 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Login</h2>
      <form onSubmit={loginHandler}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline h-10"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(event) => { setPassword(event.target.value) }}
          />
          <span className='absolute top-8 right-5'
            onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (<AiOutlineEye fill="#124076" size={28} />) : <AiOutlineEyeInvisible fill="#124076" size={28} />}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  focus:shadow-outline"
            type="button"
            onClick={handler}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
