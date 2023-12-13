import "../App.css";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="auth">
      <p>Sign In With Google To Continue</p>
      <button className="auth-btn btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};
export default Auth;
