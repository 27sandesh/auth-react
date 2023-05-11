import AuthContext from "../Store/Data-context";
import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
const ProfileForm = () => {
  const history = useHistory();
  const AuthCtx = useContext(AuthContext);
  const NewPassowordRef = useRef();
  const Submithandler = (event) => {
    event.preventDefault();
    const enterdpassword = NewPassowordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAmU60kpELI_1S6pQBLLfLHQC2lRadVs2w",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: AuthCtx.token,
          password: enterdpassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": 'application/json"',
        },
      }
    ).then((data) => {
      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={Submithandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={NewPassowordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
