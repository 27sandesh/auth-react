import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  function Submithandler(event) {
    const enterdemail = emailInputRef.current.value;
    const enterdpassword = passwordInputRef.current.value;

    event.preventDefault();
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmU60kpELI_1S6pQBLLfLHQC2lRadVs2w";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmU60kpELI_1S6pQBLLfLHQC2lRadVs2w";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enterdemail,
        password: enterdpassword,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authcation failed";
            // alert(errorMsg);
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {})
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onClick={Submithandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.btn}>
            {isLogin ? "Login" : "Create Account"}
          </button>

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
