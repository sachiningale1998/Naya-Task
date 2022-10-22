import React from 'react'
import styles from "./navbar.module.css"
import NayaLogo from "../../collections/images/NayaLogo.png"

const Navbar = () => {
  return (
    <div className={styles.parentDiv}>
        <div className={styles.imgDiv}>
            <img src={NayaLogo} alt="NayaLogo" />
        </div>
    </div>
  )
}

export default Navbar