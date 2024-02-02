import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [users, setUsers] = useState([]);

  const handleAddedUser = useCallback(
    (data) => {
      setUsers((prev) => [...prev, data]);
    },
    []
  );

  const handleLoggedInUserGlobal = useCallback(
    (data) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === data._id ? { ...user, online: true } : user
        )
      );
    },
    []
  );

  const handleLoggedOutUserGlobal = useCallback(
    ({ _id: userId }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, online: false } : user
        )
      );
    },
    []
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/user/users", {
          method: "GET",
        });
        const result = await res.json();
        setUsers(result.users); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();  
    
    return () => {
      socket.off("added_user", handleAddedUser);
      socket.off("user_logged_global", handleLoggedInUserGlobal);
      socket.off("user_logged_out_global", handleLoggedOutUserGlobal);
    };
  }, [handleAddedUser, handleLoggedInUserGlobal, handleLoggedOutUserGlobal]);

  useEffect(() => {
    socket.on("added_user", handleAddedUser);
    return () => {
      socket.off("added_user", handleAddedUser);
    };
  }, [handleAddedUser]);

  useEffect(() => {
    socket.on("user_logged_global", handleLoggedInUserGlobal);
    return () => {
      socket.off("user_logged_global", handleLoggedInUserGlobal);
    };
  }, [handleLoggedInUserGlobal]);

  useEffect(() => {
    socket.on("user_logged_out_global", handleLoggedOutUserGlobal);
    return () => {
      socket.off("user_logged_out_global", handleLoggedOutUserGlobal);
    };
  }, [handleLoggedOutUserGlobal]);

  return (
    <BrowserRouter>
      <Navbar socket={socket} />
      <div className="flex justify-center items-center min-h-[90vh] bg-gray-100">
        <Routes>
          <Route path="/" element={<Home users={users} />} />
          <Route path="/login" element={<Login socket={socket} />} />
          <Route path="/signup" element={<Signup socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
