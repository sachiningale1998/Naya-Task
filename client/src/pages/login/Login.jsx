import React, { useState } from "react";
import styles from "./login.module.css";
import googleLogo from "../../collections/images/GoogleLogo.jpg";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //google login profile
  const [profile, setProfile] = useState([]);

  const clientId =
    "657665896778-r3b3597fidl43ao0fbdlb4fd695d128f.apps.googleusercontent.com";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://sketchserver.herokuapp.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.user) {
        let token = data.user;
        localStorage.setItem("token", token);

        alert("Login successful");
        setEmail("");
        setPassword("");
        navigate("/drawboard");
      } else {
        alert("Please check email and password");
      }
    } catch (e) {
      console.log("e: ", e);
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
    let profileobj = res.profileObj;
    setProfile(profileobj);
    logInWithGoogle(profileobj);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logInWithGoogle = async (profile) => {
    try {
      let response = await fetch(
        "https://sketchserver.herokuapp.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...profile }),
        }
      );

      let data = await response.json();
      if (data.status === "error") {
        alreadyUsed(profile);
      }
      if (data.status === "ok") {
        alert("login successful");
        navigate("/drawboard");
      }
    } catch (e) {
      console.log("e: ", e);
    }
  };

  async function alreadyUsed(profile) {
    let email = profile.email;
    try {
      let response = await fetch(
        "https://sketchserver.herokuapp.com/auth/googlelogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("Login successful");
        getInfo(email);
      } else {
        alert("Please check email and password");
      }
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log("e: ", e);
    }
  }

  async function getInfo(email) {
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
      navigate("/drawboard");
    } catch (err) {
      console.log("errInGetInfo: ", err);
    }
  }

  return (
    <div className={styles.parentDiv}>
      <div>
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
              <span
                onClick={() => navigate("/signup")}
                className={styles.signupLink}
              >
                Sign up
              </span>
            </p>
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
  );
};

export default Login;
