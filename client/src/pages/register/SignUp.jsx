import React, { useState } from 'react'
import styles from "./signup.module.css"
import googleLogo from "../../collections/images/GoogleLogo.jpg";
import {useNavigate} from "react-router-dom"
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from 'react';



const Register = () => {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

   //google login profile
   const [profile, setProfile] = useState([]);

   const clientId =
     "694320822890-5esppm1osmvbjucjd0g1cplthc9euqa1.apps.googleusercontent.com";
 
   async function handleSubmit(event) {
     event.preventDefault();
     let response = await fetch("http://127.0.0.1:5001/auth/signup", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         firstName,
         lastName,
         email,
         password
       }),
     });
 
     let data = await response.json();
     console.log("dataSignup: ", data);
     setEmail("");
     setPassword("");
     setFirstName("");
     setLastName("");
 
     if (data.status === "error") {
       alert("Email or number is already in use ");
     }
     if (data.status === "ok") {
       alert("Registration successful");
       navigate("/");
     }
   }
 
   useEffect(() => {
     const initClient = () => {
       gapi.client.init({
         clientId: clientId,
         scope: "",
       });
     };
     gapi.load("client:auth2", initClient);
   });
 
   const onSuccess = (res) => {
    console.log('res: ', res);
     let profileobj = res.profileObj;
     setProfile(profileobj);
     logInWithGoogle(profileobj);
   };
 
   const onFailure = (err) => {
     console.log("failed", err);
   };
 
   const logOut = () => {
     setProfile(null);
   };
 
   const logInWithGoogle = async (profile) => {
    console.log('profile_logInWithGoogle: ', profile);
     let response = await fetch("http://127.0.0.1:5001/auth/signup", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ ...profile }),
     });
 
     let data = await response.json();
     console.log('data:logInWithGoogle ', data);
     if (data.status === "error") {
       alreadyUsed(profile);
     }
     if (data.status === "ok") {
       alert("login successful");
      //  navigate("/");
     }
   };
 
   async function alreadyUsed(profile) {
     let email = profile.email;
     console.log('email: ', email);
     let response = await fetch("http://127.0.0.1:5001/auth/googlelogin", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ email }),
     });
 
     const data = await response.json();
     console.log('dataalreadyUsed: ', data);
 
     if (data.user ===true) {
       localStorage.setItem("token", data.user);
       //  alert("Login successful");
       getInfo(profile);
      } else {
        alert("Please check email and password");
      }
      setEmail("");
     setPassword("");
   }
 
   async function getInfo(profile) {
     let email = profile.email;
     try {
       let resp = await fetch("http://127.0.0.1:5001/auth/googleinfo", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email }),
       });
       let data = await resp.json();
       data = data.user;
       console.log('datagetInfo: ', data);
       setUserId(data._id);
      //  navigate("/");
     } catch (err) {
       console.log("errInGetInfo: ", err);
     }
   }

  return (
      <div className={styles.parentDiv}>
      <div >
        <h3 style={{ color: "#654de4" }}>Sign Up</h3>
      </div>
      <div className={styles.mainDiv}>
        <form onSubmit={handleSubmit} className={styles.form1}>
        <div className="mb-3">
            <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
              type="string"
              className="form-control"
              placeholder="First name"
              required
            />
          </div>
          <div className="mb-3">
            <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
              type="string"
              className="form-control"
              placeholder="Last name"
              required
            />
          </div>
          <div className="mb-3">
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              className="form-control"
              value="Sign up"
              id={styles.btn}
            />
          </div>
          <div className={styles.newUserSignupLinkDiv}>
            <p>Or</p>
          </div>
          
        </form>
        <div className={styles.googleLoginDiv}>
            {/* <button>
              <div>
                <img src={googleLogo} alt="gLogo" />
                <p>Log in with Google</p>
              </div>
            </button> */}
            <GoogleLogin
                buttonText="Sign in with Google"
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
        </div>
      </div>
    </div>
    
  )
}

export default Register