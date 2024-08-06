import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
   const [userinfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  //axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("trying to get user from cookie");
        const response = await axios.get(`http://localhost:8000/api/auth/user`);
        const data = response.data;
        console.log(data, "got user from cookie");
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);
  
  
   useEffect(() => {
     const fetchUser = async () => {
       try {
         console.log("trying to get saved coins");
         const response = await axios.get(
           `http://localhost:8000/api/auth/user/watchlist/${user.email}`
         );
         console.log(response.data, " userinfo update ");
         const data = response.data;

         setUserInfo(data);
       } catch (error) {
         console.error("Failed to fetch user data:", error);
       }
     };

     fetchUser();
   }, [user?.email, user?.watchList]);
   
  // useEffect(() => {
  //   // Check for token in localStorage
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       // Decode the token and set the user state
  //       const decodedUser = jwtDecode(token);
  //       setUser(decodedUser);
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //       // If the token is invalid, remove it from localStorage
  //       localStorage.removeItem("token");
  //       setUser(null);
  //       navigate("/login");
  //     }
  //   } else {
  //     setUser(null);
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser,userinfo,setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
