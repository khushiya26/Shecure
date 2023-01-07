// section for featuring top 6 blogs

import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import BlogBox from "../Elements/BlogBox";
import FullButton from "../Buttons/FullButton";
import TestimonialSlider from "../Elements/TestimonialSlider";
// import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Blog() {
	const [data, setdata] = useState([]);
	const getData = async () => {
		let temp = [];
		let i = 0;
		const querySnapshot = await getDocs(collection(db, "AllBlogs"));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			if (i < 6) {
				temp.push(doc.data());
				i++;
			} else {
				return;
			}
		});
		setdata(temp);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Wrapper id="blog" style={{ marginTop: "50px" }}>
			<div className="whiteBg">
				<div className="container">
					<HeaderInfo>
						<h1 className="font40 extraBold">Our Blog Stories</h1>
						<p className="font13">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
							nonumy eirmod tempor invidunt ut
							<br />
							labore et dolore magna aliquyam erat, sed diam voluptua.
						</p>
					</HeaderInfo>
					<div className="row textCenter">
						{data.map((item,idx) => (
							<div key={idx+1} className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<BlogBox
									title={item.title}
									text={item.text}
									tag={item.tag}
									author={`${item.name} , ${item.day}`}
								/>
							</div>
						))}
						{/* <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
							<BlogBox
								title="New Office!"
								text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
								tag="company"
								author="Luke Skywalker, 2 days ago"
							/>
						</div>
						<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
							<BlogBox
								title="New Office!"
								text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
								tag="company"
								author="Luke Skywalker, 2 days ago"
							/>
						</div> */}
					</div>
					{/* <div className="row textCenter">
						<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
							<BlogBox
								title="New Office!"
								text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
								tag="company"
								author="Luke Skywalker, 2 days ago"
							/>
						</div>
						<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
							<BlogBox
								title="New Office!"
								text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
								tag="company"
								author="Luke Skywalker, 2 days ago"
							/>
						</div>
						<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
							<BlogBox
								title="New Office!"
								text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
								tag="company"
								author="Luke Skywalker, 2 days ago"
							/>
						</div>
					</div> */}
				</div>
			</div>
			<div className="lightBg" style={{ padding: "50px 0" }}>
				<div className="container">
					<HeaderInfo>
						<h1 className="font40 extraBold">Doctor Says</h1>
						<p className="font13">
							Periods are also stigmatized.
							<br />A 2002 study found that people reported greater feelings of
							negativity toward a woman if they knew she was menstruating.
						</p>
					</HeaderInfo>
					<TestimonialSlider />
				</div>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 100%;
	padding-top: 20px;
`;
const HeaderInfo = styled.div`
	margin-bottom: 30px;
	@media (max-width: 860px) {
		text-align: center;
	}
`;
