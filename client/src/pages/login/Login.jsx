import React from "react";
import styles from "./login.module.css";
import googleLogo from "../../collections/images/GoogleLogo.jpg";

const Login = () => {
  return (
    <>
      <div>
        <h3 style={{ color: "#654de4" }}>Log In to continue</h3>
      </div>
      <div className={styles.mainDiv}>
        <form className={styles.form1}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
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
              <span className={styles.signupLink}>Sign up</span>
            </p>
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
    </>
  );
};

export default Login;
