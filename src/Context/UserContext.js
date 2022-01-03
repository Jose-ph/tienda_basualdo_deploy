import React, { useState, useEffect, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config";




export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");

  const [user, setUser] = useState();
  const [logged, setLogged] = useState(false);

  const provider = new GoogleAuthProvider();

 

  //LOGIN SIGN UP
  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        
        setError("");
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //LOGIN SIGN IN----------------
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        setError("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        console.log(errorCode);
      });
  };

  //LOGOUT-------------------
  const logout = () => {
    signOut(auth)
      .then(() => {
        setError("");
       
      })
      .catch((error) => {
        const errorLogout =
          "Parece que hubo un problema con el cierre de sesión, intenta nuevamente";
        setError(errorLogout);
      });
  };

  //GOOGLEAUTH---------------
  const googleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("GOOGLEAUTH: ", user);
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLogged(true);
        setError("");
      } else {
        setLogged(false);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ user, logged, error, login, logout, signup, googleAuth }}
    >
      {children}
    </UserContext.Provider>
  );
};