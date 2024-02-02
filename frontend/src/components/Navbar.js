import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { CloseIcon, ProfileIcon } from "../Icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actions/UserAction";

const Navbar = ({ socket }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDataRedux = useSelector((state) => state.UserReducer.userData);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const logoutUser = async () => {
    const sendBody = { email: userDataRedux.email };
    const headers = { "content-type": "application/json" };
    try {
      const res = await fetch("http://localhost:3001/api/user/logout", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(sendBody),
      });
      const result = await res.json();
      if (res.ok) { 
        localStorage.removeItem("userData")
        dispatch(updateUser(null));
        navigate("/login");
        setProfileOpen(false);
        socket.emit("logout_user_global", result.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <nav className="bg-gray-800 w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl sm:text-2xl font-bold">
          Socket App
        </Link>
        <div className="space-x-4 flex  items-center">
          <Link
            to="/"
            className="text-white text-sm sm:text-base hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <div className="space-x-4 inline-block ">
            {userDataRedux !== null && userDataRedux.online ? (
              <div className="flex gap-4 items-center">
                <button
                  onClick={logoutUser}
                  className="text-red-500 text-sm sm:text-base hover:text-red-600  cursor-pointer"
                >
                  Logout
                </button>
                <button
                  onClick={() => setProfileOpen(!isProfileOpen)}
                  className="text-white hover:text-gray-300 transition duration-300 flex items-center focus:outline-none"
                >
                  <ProfileIcon width={35} height={35} />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-2 top-14  bg-white p-4 rounded-md shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-800 text-sm sm:text-base font-semibold">
                        {userDataRedux.name}
                      </p>
                      <button
                        onClick={() => setProfileOpen(false)}
                        className="text-gray-500 text-sm sm:text-base hover:text-gray-700 cursor-pointer focus:outline-none"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-2">{userDataRedux.email}</p>
                    <p className="text-gray-600">{userDataRedux.phoneNumber}</p>
                    <button
                      onClick={logoutUser}
                      className="text-red-500 text-sm sm:text-base hover:text-red-700 mt-2 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-white text-sm sm:text-base hover:text-gray-300 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white text-sm sm:text-base hover:text-gray-300 transition duration-300"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
