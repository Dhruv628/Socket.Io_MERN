const userData =localStorage.getItem("userData")  

const initialState = {
  userData:
  userData  ? JSON.parse(userData) || null : null, 
};

const UPDATE_USER = "UPDATE_USER";

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER: 
      const userData = action.payload;
      return {
        ...state,
        userData: userData,
      };
    default:
      return state;
  }
};
