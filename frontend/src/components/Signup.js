import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ socket }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [alertText, setAlertText] = useState(null);
  const handleChange = (key, newValue) => {
    let tempUserData = { ...userData };
    tempUserData[key] = newValue;
    setUserData(tempUserData);
  };

  const handleSignup = async () => {
    const sendBody = {
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    };
    const headers = {
      "content-type": "application/json",
    };
    try {
      const res = await fetch("http://localhost:3001/api/user/signup", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(sendBody),
      });
      const result = await res.json();
      if (res.ok) {
        socket.emit("new_user_registered", result.user);
        return navigate("/login");
      } else {
        setAlertText("Email already in use");
      } 
    } catch (error) {
      setAlertText("Error occured, please try again"); 
    } finally {
      setTimeout(() => {
        setAlertText(null);
      }, 2000);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <div className="flex flex-col mx-2 items-center mt-10 sm:mt-0 p-6 bg-white rounded-lg shadow-md">
      <div className="text-xl sm:text-2xl font-semibold mb-4">Signup</div>
      <form onSubmit={onFormSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            required
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full mt-2 p-2 border border-black rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full mt-2 p-2 border border-black rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input 
          required
            type="tel" 
            id="phoneNumber"
            pattern="[0-9]{10,11}" 
            placeholder="Enter your phone number"
            title="Please enter a valid phone number with 10 to 11 digits"
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className="w-full mt-2 p-2 border border-black rounded-md"
          />
        </div>
        {alertText !== null && (
          <div className="text-sm mb-4 text-center text-red-500">
            {alertText || ""}
          </div>
        )}
        <button className="w-full p-2 mb-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
          Signup
        </button>
      </form>
      <Link to="/login" className="text-sm flex items-center justify-center">
        Already have an account?
        <span className="pl-1 hover:underline"> Login</span>
      </Link>
    </div>
  );
};

export default Signup;
