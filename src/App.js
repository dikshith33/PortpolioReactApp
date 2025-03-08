import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import profilePic from "./porfile.jpg"; // Ensure correct image path
import lcImg from "./lcimg.png"; // Ensure correct image path

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ✅ NAVBAR COMPONENT
const Navbar = () => (
  <nav className="navbar navbar-expand-lg">
    <div className="container">
      <a className="navbar-brand" href="#">Dilli Dikshith D</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
          <li className="nav-item"><a className="nav-link" href="#resume">Resume</a></li>
          <li className="nav-item"><a className="nav-link" href="#projects">Projects</a></li>
          <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

// ✅ HERO SECTION
const Hero = () => (
  <header className="hero text-center">
    <div className="container">
      <img src={profilePic} alt="Profile" className="profile-pic" />
      <h1>Welcome to My Portfolio</h1>
      <p>Aspiring IT Student | Passion for Learning New Technologies</p>
    </div>
  </header>
);

// ✅ ABOUT SECTION
const About = () => (
  <section id="about" className="section text-center">
    <div className="container">
      <h2>About Me</h2>
      <p>I am Dilli Dikshith D, an aspiring IT student from Madras Institute of Technology, Anna University.</p>
    </div>
  </section>
);

// ✅ RESUME SECTION
const Resume = () => (
  <section id="resume" className="section text-center">
    <div className="container">
      <h2>Resume</h2>
      <p>B.Tech IT student with various technical skills.</p>
      <a href="#" download className="btn btn-light">Download Resume</a>
    </div>
  </section>
);

// ✅ PROJECT CARD COMPONENT
const ProjectCard = ({ title, description, link }) => (
  <div className="col-md-4">
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" className="btn btn-light" rel="noopener noreferrer">View Project</a>
    </div>
  </div>
);

// ✅ PROJECTS SECTION (Fetches projects from API)
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/projects`)
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container text-center">
        <h2>My Projects</h2>
        {loading ? <p>Loading projects...</p> : (
          <div className="row">
            {projects.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ✅ CONTACT FORM COMPONENT (Fixed Issues)
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message.");
    }
  };

  return (
    <section id="contact" className="section text-center">
      <div className="container">
        <h2>Contact Me</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <textarea 
            name="message"
            placeholder="Your Message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
          <button type="submit">Send Message</button>
        </form>
        {status && <p>{status}</p>} {/* Display Status */}
      </div>
    </section>
  );
};

// ✅ FOOTER SECTION
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h5>About Me</h5>
          <p>Aspiring IT student passionate about learning new technologies.</p>
        </div>
        <div className="col-md-4">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="#about">About</a></li>
            <li><a href="#resume">Resume</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h5>Follow Me</h5>
          <div className="social-links">
            <a href="https://leetcode.com/u/dikshith12345ty/" target="_blank" rel="noopener noreferrer">
              <img src={lcImg} alt="LeetCode" className="social-icon" />
            </a>
            <a href="https://github.com/dikshith33" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github"></i>
            </a>
            <a href="https://x.com/Dikshith1095873" target="_blank">
                      <i class="bi bi-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/dilli-dikshith-d-7a465128b" target="_blank">
                      <i class="bi bi-linkedin"></i>
             </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-center">
        <p>&copy; 2025 Dilli Dikshith D. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

// ✅ MAIN APP COMPONENT
const App = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Resume />
    <Projects />
    <Contact />
    <Footer />
  </>
);

export default App;
