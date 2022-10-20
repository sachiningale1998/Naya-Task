import React from 'react'
import styles from "./signup.module.css"
import googleLogo from "../../collections/images/GoogleLogo.jpg";
import {useNavigate} from "react-router-dom"


const Register = () => {
  return (
      <div className={styles.parentDiv}>
      <div >
        <h3 style={{ color: "#654de4" }}>Sign Up</h3>
      </div>
      <div className={styles.mainDiv}>
        <form className={styles.form1}>
        <div className="mb-3">
            <input
              type="string"
              className="form-control"
              placeholder="First name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="string"
              className="form-control"
              placeholder="Last name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <input
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
          <div className={styles.googleLoginDiv}>
            <button>
              <div>
                <img src={googleLogo} alt="gLogo" />
                <p>Log in with Google</p>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default Register