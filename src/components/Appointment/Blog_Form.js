import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";  // Import db from your firebase.js
import { Toaster, toast } from "react-hot-toast";
import TopNavbar from "../Nav/TopNavbar";
import Footer from "../Sections/Footer";
import "./user.css";

const BlogForm = () => {
  const [user, setUser] = useState({
    Name: "",
    Age: "",
    Email: "",
    Problems: "",
    Date: "",
    Time: "",
  });

  // Handle the form submission and add data to Firestore
  const handleUserDoc = async (e) => {
    e.preventDefault();

    try {
      // Add document to the "Patient" collection in Firestore
      await addDoc(collection(db, "Patient"), user);
      
      toast.success("Your appointment is booked!"); // Show success message

      // Clear the form after submission
      setUser({
        Name: "",
        Age: "",
        Email: "",
        Problems: "",
        Date: "",
        Time: "",
      });

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      toast.error("Error occurred while booking your appointment."); // Show error message
      console.error("Error details:", err.message); // Log the error in console
    }
  };

  return (
    <>
      <TopNavbar />
      <div
        className="main-user"
        style={{ paddingTop: "120px", paddingBottom: "100px" }}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#FA4C86",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "#FA4C86",
                secondary: "black",
              },
            },
          }}
        />
        <div
          className="container"
          style={{
            background: "#FA4C86",
            padding: "20px 20px",
            borderRadius: "15px",
          }}
        >
          <div className="card">
            <div className="card-image">
              <h2 className="card-heading">
                Get started
                <small>Let's Book your Appointment</small>
              </h2>
            </div>
            <form className="card-form" onSubmit={handleUserDoc}>
              <div className="input">
                <input
                  type="text"
                  className="input-field"
                  onChange={(e) => setUser({ ...user, Name: e.target.value })}
                  required
                  value={user.Name}
                />
                <label className="input-label">Full name</label>
              </div>
              <div className="input">
                <input
                  type="number"
                  min="10"
                  max="60"
                  className="input-field"
                  onChange={(e) => setUser({ ...user, Age: e.target.value })}
                  required
                  value={user.Age}
                />
                <label className="input-label">Age in years</label>
              </div>
              <div className="input">
                <input
                  type="email"
                  className="input-field"
                  onChange={(e) => setUser({ ...user, Email: e.target.value })}
                  required
                  value={user.Email}
                />
                <label className="input-label">Email Address</label>
              </div>
              <div className="input">
                <input
                  type="text"
                  className="input-field"
                  onChange={(e) => setUser({ ...user, Problems: e.target.value })}
                  required
                  value={user.Problems}
                />
                <label className="input-label">What's troubling you?</label>
              </div>
              <div className="input">
                <input
                  type="date"
                  className="input-field"
                  onChange={(e) => setUser({ ...user, Date: e.target.value })}
                  required
                  value={user.Date}
                />
                <label className="input-label">Date</label>
              </div>
              <div className="input">
                <input
                  type="time"
                  className="input-field"
                  onChange={(e) => setUser({ ...user, Time: e.target.value })}
                  required
                  value={user.Time}
                />
                <label className="input-label">Time</label>
              </div>
              <div className="action">
                <button className="action-button" type="submit">
                  Book Your Slot
                </button>
              </div>
            </form>
            <div className="card-info">
              <p>
                By signing up, you are agreeing to our{" "}
                <a href="#">Terms and Conditions</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogForm;