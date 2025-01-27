import React, { useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Screens
import Landing from "./screens/Landing.jsx";
import Dashboard from "./components/dashboard/Dashboard.js";
import TrackPeriod from "./components/Period_Cycle/Tracker_Period.jsx";
import TrackPeriod2 from "./components/Period_Cycle/TrackPeriod2";
import SignUp from "./components/login/signUp.jsx";
import Login from "./components/login/Login.jsx";
import UserForm from "./components/Appointment/UserForm.js";
import BlogForm from "./components/Appointment/Blog_Form.js";
import Blog from "./components/Blog/Blog.js";
import BlogShow from "./components/BlogShow/BlogShow.jsx";
import DashboardBlogCard from "./components/Sections/DashboardBlogCard.jsx";
import NearClinic from "./components/nearestClinic/nearestClinic.jsx";
import NearHospital from "./components/nearestHospital/nearestHospital.jsx";
import MoodyBot from "./components/moodyBot.jsx";
import Harassform from "./components/harassform/harassform.js";
import WakeUpHelp from './components/WakeUpHelp/WakeUpHelp.js';
import Diet from './components/diet/diet.jsx';
import DoctorDashboard from './components/doctor/DoctorDashboard'; // Adjust path as needed
import NGODashboard from './components/ngo/NGODashboard';

export default function App() {
	const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Check user type from localStorage
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []);

  // Navigate based on user type
  const renderRoutes = () => {
    if (userType === "doctor") {
      return <Navigate to="/doctor-dashboard" />;
    } else if (userType === "ngo") {
      return <Navigate to="/ngo-dashboard" />;
    } else if (userType === "normal") {
      return <Navigate to="/dashboard" />;
    }
    return <Navigate to="/" />;
  };
	return (
		<>
			<Helmet>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
					rel="stylesheet"
				/>
				<title>Shecure</title>
			</Helmet>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/track" element={<TrackPeriod />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/appointment" element={<UserForm />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:id" element={<BlogShow />} />
					<Route path="/dashboard/track" element={<TrackPeriod2 />} />
					<Route path="/blogform" element={<BlogForm />} />
					<Route path="/dash" element={<DashboardBlogCard />} />
					<Route path="/nearclinic" element={<NearClinic />} />
					<Route path="/nearhospital" element={<NearHospital />} />
					<Route path="/moodybot" element={<MoodyBot />} />
					<Route path="/harassform" element={<Harassform />} />
					<Route path="/WakeUpHelp" element={<WakeUpHelp />} />
					<Route path="/Diet" element={<Diet />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
		  			<Route path="/ngo-dashboard" element={<NGODashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
