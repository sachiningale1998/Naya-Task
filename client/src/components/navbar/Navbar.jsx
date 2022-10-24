import React, { useState } from 'react'
import styles from "./navbar.module.css"
import NayaLogo from "../../collections/images/NayaLogo.png"
import { GoogleLogout } from 'react-google-login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [displayPic, setDisplayPic] = useState("");
  const [picExists, setPicExists] = useState(false);

  const navigate = useNavigate()

  const clientId =
    "694320822890-5esppm1osmvbjucjd0g1cplthc9euqa1.apps.googleusercontent.com";

    let token = localStorage.getItem("token") || null ;
    useEffect(() => {
      if (token) {
        let tokenInfo = JSON.parse(atob(token.split(".")[1]));
        setEmail(tokenInfo.email);
        getInfo();
      }
    },);
  
    async function getInfo() {
      try {
        let resp = await fetch("https://sketchserver.herokuapp.com/auth/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });
        let data = await resp.json();
        data = data.user;
        let name = data.givenName + " "+ data.familyName;
        setUserName(name)
        if(data.imageUrl){
          setDisplayPic(data.imageUrl)
          setPicExists(true)
        }
        // setLoggedInUser(name.split(" ")[0]);
        // getCartData(data);
      } catch (err) {
        console.log("errInGetInfo: ", err);
      }
    }



  const logOut = () => {
    setProfile(null);
    if (localStorage.getItem('token')) {
      localStorage.clear();
      setUserName(null);
      setDisplayPic(null);
    }
    navigate("/")
  };


  return (
    <div className={styles.parentDiv}>
        <div className={styles.imgDiv}>
            <img src={NayaLogo} alt="NayaLogo" />
        </div>
        <div className={styles.userProfile}>
          <div>
            <h6>{userName}</h6>
          </div>
            {picExists &&
              <div className={styles.userProfileImg}>
                <img src={displayPic}  />
              </div>
            }
          <div>
          <GoogleLogout
                style={{width: '60px'}}
                clientId={clientId}
                buttonText="Log out"
                onLogoutSuccess={logOut}
              />
          </div>
        </div>
    </div>
  )
}

export default Navbar