import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../helpers/Cookie";

const Login = ({ socket }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [alertText, setAlertText] = useState(null);

  const handleChange = (value) => {
    setEmail(value);
  };

  const handleLogin = async () => {
    const sendBody = {
      email: email,
    };
    const headers = {
      "content-type": "application/json",
    };
    try {
      const res = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(sendBody),
      });
      const result = await res.json();
      if (res.ok) { 
        setCookie("userData",JSON.stringify(result.user));
        socket.emit("user_login_global", result.user);
        navigate("/"); 
      } else {
        setAlertText("Invalid email");
      } 
    } catch (error) {
      setAlertText("Error occured, please try again"); 
    } finally {
      setTimeout(() => {
        setAlertText(null);
      }, 1500);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-w-[23vw] flex flex-col justify-center  p-6 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-semibold mb-4">Login</div>
      <form onSubmit={onFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => handleChange(e.target.value)}
            className="w-full mt-2 p-2 border border-black rounded-md"
          />
        </div>
        {alertText !== null && (
          <div className="text-sm mb-4 text-center text-red-500">
            {alertText || ""}
          </div>
        )}
        <button 
          className="w-full mb-2 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Login
        </button>
      </form>
      <Link to="/signup" className="text-sm items-center flex justify-center">
        Create <span className="pl-1 hover:underline">account</span>
      </Link>
    </div>
  );
};

export default Login;
