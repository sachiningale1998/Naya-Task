import React from 'react'
import styles from "./navbar.module.css"

const Navbar = () => {
  return (
    <div className={styles.parentDiv}>
        <div className={styles.imgDiv}>
            <img src="https://media-exp1.licdn.com/dms/image/C560BAQEaxYgfOrYbVw/company-logo_200_200/0/1657135218810?e=1674086400&v=beta&t=4jECrCAqE3TqF8h3BAQyCebIB7vXNTks4QMaPLcX080" alt="NayaLogo" />
        </div>
    </div>
  )
}

export default Navbar