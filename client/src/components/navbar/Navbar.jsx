import React, { useState } from 'react'
import styles from "./navbar.module.css"
import NayaLogo from "../../collections/images/NayaLogo.png"
import { GoogleLogout } from 'react-google-login';

const Navbar = () => {
  const [profile, setProfile] = useState([]);

  const clientId =
    "694320822890-5esppm1osmvbjucjd0g1cplthc9euqa1.apps.googleusercontent.com";

    
  const logOut = () => {
    setProfile(null);
  };


  return (
    <div className={styles.parentDiv}>
        <div className={styles.imgDiv}>
            <img src={NayaLogo} alt="NayaLogo" />
        </div>
        <div>
        <GoogleLogout
                clientId={clientId}
                buttonText="Log out"
                onLogoutSuccess={logOut}
              />
        </div>
    </div>
  )
}

export default Navbar