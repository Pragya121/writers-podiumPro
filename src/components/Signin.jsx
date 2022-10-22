import React from "react";
import data from "../assets/data";
import Home from "./Home"
import Footer from "./Footer"
import Navbar from "./Navbar"
import App from "../App"
import "./Signin.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Signin = () => {
  const isLoading = React.useState(false);
  const [loginData, setLoginData] = React.useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const [token, setToken] = React.useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  
  const handleGoogleclick = (e) =>{
    signInWithPopup(data.auth, data.provider)
    .then((result) => {
      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      localStorage.setItem("loginData",JSON.stringify(user));
      localStorage.setItem("token",JSON.stringify(user.accessToken));
      setToken(user.accessToken);
      setLoginData(user);
      
    }).catch((error) => {
      // Handle Errors here.
      
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      alert("We could not log you in. Please try again");
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  
  }
 

  return(
    <span>{!token?<div className="main__container">  <h2>Please login to continue</h2>
    
      <div className="imgcontainer">
        <img src={data.design} alt="Avatar" className="avatar" />
      </div>
      <div className="container"> 
      <button className="googleSignIn" onClick={handleGoogleclick}> Sign in with Google </button> 
       </div>
    </div> : <div>
      <App></App>
      </div>}
   
  </span>
  )
};
export default Signin;  
