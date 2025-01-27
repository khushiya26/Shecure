import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './blog.css';

const Blog = () => {
  const { id } = useParams(); // Get blog post ID from the URL
  const [blogData, setBlogData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      const docRef = doc(db, "AllBlogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlogData(docSnap.data());
      } else {
        navigate('/'); // Redirect if the blog post is not found
      }
    };

    fetchBlogData();
  }, [id, navigate]);

  return (
    <div className="blog-container">
      {blogData ? (
        <div className="blog-post">
          <h1>{blogData.name}'s Harassment Report</h1>
          <h2>Location: {blogData.location}</h2>
          <p><strong>Preferred Contact Method:</strong> {blogData.contactMethod}</p>
          <p><strong>Duration:</strong> {blogData.duration}</p>
          <p><strong>Frequency of Incidents:</strong> {blogData.frequency}</p>
          <h3>Situation:</h3>
          <p>{blogData.situation}</p>
          <h3>Culprit Description:</h3>
          <p>{blogData.culprit}</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Blog;
