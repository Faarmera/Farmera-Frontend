// PLEASE, DO NOT CHANGE ANYTHING HERE UNLESS YOU INFORM OPEOLUWA

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
          isAuthenticated: true,
          user: action.payload.user
      };
    case 'SIGN_OUT':
      return {
          isAuthenticated: false,
          user: null
      };
    default:
      return state;
  }
};

// Auth Context
const AuthContext = createContext(null);

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {

    const token = localStorage.getItem("token")

    const userData = localStorage.getItem("user");

    if (token && userData) {

        const user = JSON.parse(userData);

        dispatch({

          type: "SIGN_IN",
          payload: {
              user: {

                  _id: user._id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  phonenumber: user.phonenumber,
                  role: user.role,
                  type: user.type,
                  isAdmin: user.type === "admin"
                  
              },
              token
          }

        });
    }
    
  }, []);

  return (<AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>);
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
