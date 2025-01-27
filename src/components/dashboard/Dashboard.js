import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc } from "firebase/firestore";
import { textAlign } from "@mui/system";
import DashboardBlogCard from "../Sections/DashboardBlogCard";
import Modal from "../Modal/Modal";
import "../Sections/blogCard.css";
import { MdLocalHospital } from "react-icons/md";
  // Adjust the path according to where your WakeUpHelp component is located


const Dashboard = () => {
	const navigate = useNavigate();
	const [CurrentUser, SetCurrentuser] = useState({});
	const [openModel, setOpenModel] = useState(false);
	const [blogs, setblogs] = useState([]);
	const [idarr, setidarr] = useState([]);
	const [size, setsize] = useState(0);

	const userActivity = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				SetCurrentuser(user);
				// ...
			} else {
				// User is signed out
				navigate("/");
				// ...
			}
		});
	};
	function getBlogs() {
		let blog = [];
		let ids = [];
		db.collection("blogs")
			.doc(auth.currentUser?.uid)
			.collection("blog")
			.onSnapshot((snapshot) => {
				snapshot.docs.map((doci) => {
					ids.push(doci.id);
					// console.log(doci.id, doci.data());
					blog.push(doci.data());
				});
			});
		setsize(blog.length);
		setblogs(blog);
		setidarr(ids);
	}

	useEffect(() => {
		userActivity();
		return () => {
			SetCurrentuser({});
		};
	}, []);

	return (
		<>
			<Helmet>
				<title>{`Shecure | ${CurrentUser?.displayName} Dashboard`}</title>
			</Helmet>
			{/* <!-- Banner --> */}
			
			{/* <!-- Dashboard --> */}
			<div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
				{/* <!-- Vertical Navbar --> */}
				<nav
					className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
					id="navbarVertical"
				>
					<div className="container-fluid">
						{/* <!-- Toggler --> */}
						<button
							className="navbar-toggler ms-n2"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#sidebarCollapse"
							aria-controls="sidebarCollapse"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						{/* <!-- Brand --> */}
						<div style={{ marginLeft: "10px" }}>
							<img
								width={70}
								height={70}
								style={{ borderRadius: "100%", margin: "auto" }}
								src={
									CurrentUser.photoURL != null
										? CurrentUser?.photoURL
										: "/log1.jpeg"
								}
								alt="..."
							/>{" "}
							<span
								style={{
									fontSize: "1.2rem",
									fontWeight: "700",
									paddingLeft: "50px",
									marginTop: "20px",
									color: "#F65AA8",
									textAlign: "center",
								}}
							>
								{CurrentUser?.displayName}
							</span>
						</div>
						{/* <!-- User menu (mobile) --> */}
						<div className="navbar-user d-lg-none">
							{/* <!-- Dropdown --> */}
							<div className="dropdown">
								{/* <!-- Toggle --> */}
								<a
									href="#"
									id="sidebarAvatar"
									role="button"
									data-bs-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<div className="avatar-parent-child">
										<img
											alt="Image Placeholder"
											src={
												CurrentUser.photoURL != null
													? CurrentUser?.photoURL
													: "https://user-images.githubusercontent.com/86917304/189530487-4f2eba29-9268-4801-9f4f-b2a9b03948a1.png"
											}
											className="avatar avatar- rounded-circle"
										/>
										<span className="avatar-child avatar-badge bg-success"></span>
									</div>
								</a>
								{/* <!-- Menu --> */}
								<div
									className="dropdown-menu dropdown-menu-end"
									aria-labelledby="sidebarAvatar"
								>
									<Link to="/dashboard" className="dropdown-item">
										Home
									</Link>
									<Link to="/track" className="dropdown-item">
										Period Tracker
									</Link>
									<Link to="/diet" className="dropdown-item">
										Diet
									</Link>
									<Link to="/moodtracker" className="dropdown-item">
										Mood Tracker
									</Link>
									<Link to="/blogform" className="dropdown-item">
										BLogs
									</Link>
									<Link to="/profile" className="dropdown-item">
										Profile
									</Link>
									<hr className="dropdown-divider" />
									<a
										href="#"
										onClick={() => auth.signOut()}
										className="dropdown-item"
									>
										Logout
									</a>
								</div>
							</div>
						</div>
						{/* <!-- Collapse --> */}
						<div className="collapse navbar-collapse" id="sidebarCollapse">
							{/* <!-- Navigation --> */}
							<ul className="navbar-nav">
    
    <li className="nav-item">
        <h5 className="nav-heading ml-2">Physical Health</h5>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/track">
            <i className="bi bi-bookmarks"></i> Period Tracker
        </Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to={"/nearclinic"}>
            <i className="bi bi-cart-plus"></i> Nearest Pharmacy
        </Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to={"/nearhospital"}>
            <i className="bi bi-file-medical"></i> Nearest Hospital
        </Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to={"/appointment"}>
            <i className="bi bi-calendar-check"></i> Appointment
        </Link>
    </li>

   
    <hr className="navbar-divider my-3 opacity-20" />

   
    <li className="nav-item">
        <h5 className="nav-heading ml-2">Mental Health</h5>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to={"/harassform"}>
            <i className="bi bi-file-earmark-lock"></i> Safe Voice Report
        </Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to={"/WakeUpHelp"}>
            <i className="bi bi-emoji-smile"></i> Help
        </Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to={"/moodybot"}>
            <i className="bi bi-briefcase"></i> Law Bot
        </Link>
    </li>
</ul>

							{/* <!-- Divider --> */}
							<hr className="navbar-divider my-5 opacity-20" />
							{/* <!-- Navigation --> */}
							
							{/* <!-- Push content down --> */}
							<div className="mt-auto"></div>
							{/* <!-- User (md) --> */}
							<ul className="navbar-nav">
								{/* <li className="nav-item">
									<a className="nav-link" href="#">
										<i className="bi bi-person-square"></i> Account
									</a>
								</li> */}
								<li
									className="nav-item"
									style={{ cursor: "pointer" }}
									onClick={() => auth.signOut()}
								>
									<a className="nav-link" href="#">
										<i className="bi bi-box-arrow-left"></i> Logout
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				{/* <!-- Main content --> */}
				<div className="h-screen flex-grow-1 overflow-y-lg-auto">
					{/* <!-- Header --> */}
					<header className="bg-surface-primary border-bottom pt-6">
						<div className="container-fluid">
							<div className="mb-npx">
								<div className="row align-items-center">
									<div className="col-sm-6 col-12 mb-4 mb-sm-0">
										{/* <!-- Title --> */}
										<h1
											className="h2 mb-0 ls-tight"
											style={{ color: "#5C60F5" }}
										>{`Hello , User`}</h1>
									</div>
									{/* <!-- Actions --> */}
									
								</div>
								{/* <!-- Nav --> */}
								<ul className="nav nav-tabs mt-4 overflow-x border-0">
									<li className="nav-item ">
										<a href="#" className="nav-link active">
											All Stats
										</a>
									</li>
									{/* <li className="nav-item">
										<a href="#" className="nav-link font-regular">
											Shared
										</a>
									</li>
									<li className="nav-item">
										<a href="#" className="nav-link font-regular">
											File requests
										</a>
									</li> */}
								</ul>
							</div>
						</div>
					</header>
					{/* <!-- Main --> */}
					<main className="py-6 bg-surface-secondary">
					<div className="quote-container">
      <div className="quote-content flex">
        <img
          src="/free.jpeg" // Replace with your image URL
          alt="Quote Image"
          className="quote-image"
        />
        <blockquote className="quote-text p-10 text-align-centre pt-15 text-red-800"style={{ marginTop: "7rem" }}>
          " The future belongs to those who believe in the beauty of their dreams. " 
          <footer>- Eleanor Roosevelt</footer>
        </blockquote>
      </div>
    </div>
					</main>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
