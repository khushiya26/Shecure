import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path to your firebase.js file
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons

const NGODashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Reference the 'HarassmentReports' collection
        const querySnapshot = await getDocs(collection(db, 'HarassmentReports'));
        const reportData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching harassment reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ngo-dashboard p-5">
      <h1>NGO Dashboard</h1>
      <div className="reports pb-5">
        {reports.length === 0 ? (
          <p>No harassment reports found.</p>
        ) : (
          <div className="report-cards mt-5 p-3">
            {reports.map((report) => (
              <div key={report.id} className="report-card">
                <h2>{report.name}</h2>
                <p><strong>Phone:</strong> {report.phoneNumber}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Culprit:</strong> {report.culprit}</p>
                <p><strong>Situation:</strong> {report.situation}</p>
                <p><strong>Duration (in months):</strong> {report.duration}</p>
                <p><strong>Frequency:</strong> {report.frequency}</p>

                {/* WhatsApp Icon and Link */}
                <div className="whatsapp-link">
                <a
  href={`https://wa.me/${report.phoneNumber}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Connect via WhatsApp"
  className="whatsapp-icon inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
>
  <FaWhatsapp size={18} />
  <span className="ml-2">Chat on WhatsApp</span> {/* Optional label */}
</a>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NGODashboard;
