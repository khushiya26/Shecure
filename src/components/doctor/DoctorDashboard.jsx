import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path to your firebase.js file
import { style } from '@mui/system';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Reference the 'Patient' collection
        const querySnapshot = await getDocs(collection(db, 'Patient'));
        const patientData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doctor-dashboard mt-2 pb-5 p-5">
      <h1>Doctor Dashboard</h1>
      <div className="appointments " style={{paddingBottom:"4rem"}}>
        {patients.length === 0 ? (
          <p>No appointment requests found.</p>
        ) : (
          <div className="patient-cards mt-5 ">
            {patients.map((patient) => (
              <div key={patient.id} className="patient-card">
                <h2>{patient.Name}</h2>
                <p><strong>Age:</strong> {patient.Age}</p>
                <p><strong>Email:</strong> {patient.Email}</p>
                <p><strong>Contact Time:</strong> {patient.Time}</p>
                <p><strong>Date:</strong> {patient.Date}</p>
                <p><strong>Problems:</strong> {patient.Problems}</p>
               
                <button
                  onClick={() => window.open(`mailto:${patient.Email}`, '_blank')}
                >
                  Connect via Email
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;