import React, { useState } from 'react';
import { db } from '../../firebase'; // Import Firebase configuration
import { collection, addDoc } from 'firebase/firestore'; // Firebase Firestore functions
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate hook
import './harassform.css';

const Harassform = () => {
  const [name, setName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [frequency, setFrequency] = useState('');
  const [situation, setSituation] = useState('');
  const [culprit, setCulprit] = useState('');
  const [postAsBlog, setPostAsBlog] = useState(null); // null to indicate undecided

  const navigate = useNavigate(); // Initialize navigation hook

  // Get the user's location using the browser's geolocation API
  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Handle changes to the contact method (allow only one selection at a time)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name,
        phoneNumber,
        location,
        duration,
        frequency,
        situation,
        culprit,
        postAsBlog,
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, "HarassmentReports"), formData);

      if (postAsBlog) {
        // If post as blog is true, navigate to the blog page
        navigate(`/blog/${docRef.id}`); // Navigate to the new blog post
      } else {
        alert('Your details have been submitted.');
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Harassment Report Form</h2>
      <form onSubmit={handleSubmit} className="harassment-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
  <label>Phone Number</label>
  <input
    type="tel"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    required
  />
</div>

        

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
          />
          <button type="button" onClick={handleAutoLocation} className="auto-location-btn">
            Auto Location
          </button>
        </div>

        <div className="form-group">
          <label>How Long Has This Been Occurring?</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Frequency of Incidents</label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Describe the Situation</label>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Describe the Culprit</label>
          <textarea
            value={culprit}
            onChange={(e) => setCulprit(e.target.value)}
            required
          />
        </div>

        

        <div className="form-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Harassform;
