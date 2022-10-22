import React, { useState } from "react";
import styles from "./login.module.css";
import googleLogo from "../../collections/images/GoogleLogo.jpg";
import {useNavigate} from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let response = await fetch("http://127.0.0.1:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    const data = await response.json();
    
    if (data.user) {
      let token = data.user
      localStorage.setItem("token", token);
      
      getInfo(data);
      alert("Login successful");
      setEmail("");
     setPassword("");
    } else {
      alert("Please check email and password");
    }
    
  }
  


  async function getInfo() {
    try {
      let resp = await fetch("http://127.0.0.1:8080/auth/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        }),
      });
      let data = await resp.json();
      data = data.user;
     navigate("/")
    } catch (err) {
      console.log("errInGetInfo: ", err);
    }
  }



  return (
    <div className={styles.parentDiv}>
      <div >
        <h3 style={{ color: "#654de4" }}>Log In to continue</h3>
      </div>
      <div className={styles.mainDiv}>
        <form onSubmit={handleSubmit} className={styles.form1}>
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
          <div className={styles.forgotPasswordDiv}>
            <p className={styles.forgotPasswordPTag}>Forgot password?</p>
          </div>
          <div>
            <input
              type="submit"
              className="form-control"
              value="Log In"
              id={styles.btn}
            />
          </div>
          <div className={styles.newUserSignupLinkDiv}>
            <p>
              <span>Don't have an account?</span>{" "}
              <span onClick={()=> navigate("/signup")} className={styles.signupLink}>Sign up</span>
            </p>
          </div>
          <div className={styles.newUserSignupLinkDiv}>
            <p>Or</p>
          </div>
          
        </form>
        <div className={styles.googleLoginDiv}>
            <button>
              <div>
                <img src={googleLogo} alt="gLogo" />
                <p>Log in with Google</p>
              </div>
            </button>
          </div>
      </div>
    </div>
  );
};

export default Login;
