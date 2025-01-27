import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from '../../firebase'; // Import app and db
import { FaGoogle } from "react-icons/fa";
import "./SignUp.css"; // Keep your existing styling

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('normal'); // Default to 'normal'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const auth = getAuth(app); // Initialize Firebase Authentication
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
      // Store user type in Firestore
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        userType: userType, // Save userType in Firestore
      });
    
      // Navigate to the appropriate page based on user type
      if (userType === "doctor" || userType === "ngo") {
        navigate("/login");
      } else {
        navigate("/login"); // Default dashboard for normal users
      }
    
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      setError(error.message); // Set error message if signup fails
      console.error(error.message);
    }
  };

  const googleLogin = () => {
    // Handle Google login (if needed in your app)
  };

  return (
    <div className="bg">
      <div className="signup">
        <div className="signup-connect">
          <h1 style={{ color: "#E73B91" }}>Login with Google</h1>
          <a href="#" className="btn btn-google" onClick={googleLogin}>
            <FaGoogle style={{ marginRight: "10px" }} /> Sign in with Google
          </a>
        </div>
        <div className="signup-classic" style={{ color: "black" }}>
          <h2 style={{ fontWeight: "600", fontSize: "25px" }}>
            Create Your Account
          </h2>
          <div className="form" style={{ color: "black" }}>
            <fieldset className="username">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: "black" }}
              />
            </fieldset>
            <fieldset className="email">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ color: "black" }}
              />
            </fieldset>
            <fieldset className="password">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: "black" }}
              />
            </fieldset>
            {/* Dropdown or radio buttons for user type */}
            <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
              <option value="normal">Normal User</option>
              <option value="doctor">Doctor</option>
              <option value="ngo">NGO</option>
            </select>

            <button className="btn" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;