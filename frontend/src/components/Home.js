import React from "react";
import { useSelector } from "react-redux";

const Home = ({ users }) => {
  const userData = useSelector((state) => state.UserReducer.userData);

  const updatedUsers =
    userData !== null
      ? users.map((e, i) => {
          if (e._id === userData._id) {
            return { ...e, online: true };
          } else {
            return e;
          }
        })
      : users;
  
    // Move the user with userData._id to the top of the list
    const sortedUsers = [...updatedUsers].sort((a, b) => {
    const isAOnline = a.online ? 1 : 0;
    const isBOnline = b.online ? 1 : 0;

    if (userData && a._id === userData._id) return -1;
    if (userData && b._id === userData._id) return 1;

    // Sort by online status, then by name
    return isBOnline - isAOnline || a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full py-10 flex justify-center">
      <div className="bg-white sm:w-[65%] w-[90%] md:w-[50%] rounded-lg shadow-lg">
        <div className="bg-gray-800 text-white rounded-t-lg p-4">
          <h2 className="text-2xl font-semibold">Users</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {sortedUsers && sortedUsers.length > 0 ? (
            sortedUsers.map((user) => (
              <li key={user._id}>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://via.placeholder.com/40"
                        alt={`Avatar of ${user.name}`}
                      />
                    </div>
                    <div className="ml-3">
                      {userData !== null &&
                      userData.online &&
                      userData._id === user._id ? (
                        <p className="text-lg font-bold text-gray-900">
                          {user.name} - you
                        </p>
                      ) : (
                        <p className="text-lg font-medium text-gray-900">
                          {user.name}
                        </p>
                      )}
                      <p
                        className={`text-sm ${
                          user.online ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm ${
                      user.online ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.online ? "Online" : "Offline"}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <div className="p-4">No users found</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
