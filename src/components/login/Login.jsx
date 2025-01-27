import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { FaGoogle } from "react-icons/fa";
import "./SignUp.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the userType from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userType = userDoc.data().userType;

        // Navigate based on userType
        if (userType === "doctor") {
          navigate("/doctor-dashboard");
        } else if (userType === "ngo") {
          navigate("/ngo-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        throw new Error("User data not found in Firestore");
      }
    } catch (error) {
      setError(error.message); // Set error message if login fails
      console.error(error.message);
    }
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Google Login Error:", error.message);
      });
  };

  return (
    <div className="bg">
      <div className="signup">
        <div className="signup-connect">
          <h1 style={{ color: "#E73B91" }}>Login with Google</h1>
          <button className="btn btn-google" onClick={googleLogin}>
            <FaGoogle style={{ marginRight: "10px" }} /> Sign in with Google
          </button>
        </div>
        <div className="signup-classic">
          <h2 style={{ fontWeight: "600", fontSize: "25px" }}>Login</h2>
          {error && <p className="error">{error}</p>}
          <form className="form" onSubmit={handleLogin}>
            <fieldset className="email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: "black" }}
                placeholder="Enter your email"
                required
              />
            </fieldset>
            <fieldset className="password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </fieldset>
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;