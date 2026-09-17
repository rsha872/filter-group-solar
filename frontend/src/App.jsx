import AdminDashboard from "./AdminDashboard";

import { useState } from "react";
import {
  Sun,
  Home,
  Building2,
  Factory,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    systemSize: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("http://localhost:5000/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(data.message);

        setForm({
          name: "",
          phone: "",
          email: "",
          city: "",
          systemSize: "",
          message: "",
        });
      } else {
        setStatus(data.message);
      }
    } catch (error) {
      setStatus("Unable to connect to server.");
    }
  };

  return (
    <div className="app">

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <Sun size={30} />
          <span>Filter Group Solar</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="quote-btn">
          Get a Quote
        </a>
      </header>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-content">

          <p className="tagline">
            CLEAN ENERGY • BRIGHT FUTURE
          </p>

          <h1>
            Power Your Future
            <br />
            With <span>Solar Energy</span>
          </h1>

          <p className="hero-text">
            Filter Groups se PM Surya Ghar Yojana ke tahat Uttar Pradesh mein rooftop solar lagwaein. ₹1,08,000 tak sarkari subsidy + 300 unit free bijli. Abhi apply karein – 9453548609
            
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="primary-btn">
              Get Free Quote
              <ArrowRight size={18} />
            </a>

            <a href="#services" className="secondary-btn">
              Explore Services
            </a>
          </div>

        </div>

        <div className="hero-icon">
          <Sun size={220} strokeWidth={1} />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section">

        <div className="section-heading">
          <p>OUR SERVICES</p>
          <h2>Solar Solutions For Everyone</h2>
        </div>

        <div className="services">

          <div className="service-card">
            <Home size={40} />

            <h3>Residential Solar</h3>

            <p>
              Rooftop solar solutions designed for homes and families.
            </p>

            <a href="#contact">
              Learn More <ArrowRight size={16} />
            </a>
          </div>

          <div className="service-card">
            <Building2 size={40} />

            <h3>Commercial Solar</h3>

            <p>
              Reduce business electricity costs with efficient solar systems.
            </p>

            <a href="#contact">
              Learn More <ArrowRight size={16} />
            </a>
          </div>

          <div className="service-card">
            <Factory size={40} />

            <h3>Industrial Solar</h3>

            <p>
              High-capacity solar solutions for industrial requirements.
            </p>

            <a href="#contact">
              Learn More <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="why-us">

        <div>

          <p className="section-label">
            WHY FILTER GROUP SOLAR
          </p>

          <h2>
            Smart Energy.
            <br />
            Better Future.
          </h2>

          <p>
            We provide professional solar installation and energy
            solutions with a focus on quality, reliability and
            long-term savings.
          </p>

          <ul>
            <li>
              <CheckCircle />
              Quality Solar Components
            </li>

            <li>
              <CheckCircle />
              Professional Installation
            </li>

            <li>
              <CheckCircle />
              Reliable After-Sales Support
            </li>

            <li>
              <CheckCircle />
              Customized Solar Solutions
            </li>
          </ul>

        </div>

      </section>

      {/* Projects */}
      <section id="projects" className="section">

        <div className="section-heading">
          <p>OUR WORK</p>
          <h2>Recent Solar Projects</h2>
        </div>

        <div className="projects">

          <div className="project-card">
            <div className="project-placeholder">
              Residential Project
            </div>

            <h3>Residential Rooftop Solar</h3>

            <p>5 kW Solar Installation</p>
          </div>

          <div className="project-card">
            <div className="project-placeholder">
              Commercial Project
            </div>

            <h3>Commercial Solar System</h3>

            <p>25 kW Solar Installation</p>
          </div>

          <div className="project-card">
            <div className="project-placeholder">
              Industrial Project
            </div>

            <h3>Industrial Solar Plant</h3>

            <p>100 kW Solar Installation</p>
          </div>

        </div>

      </section>

      {/* Quote Form */}
      <section id="contact" className="contact">

        <h2>Get Your Free Solar Quote</h2>

        <p>
          Tell us your requirement and our team will contact you.
        </p>

        <form
          className="quote-form"
          onSubmit={handleSubmit}
        >

          <input
            name="name"
            placeholder="Your Name *"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City *"
            value={form.city}
            onChange={handleChange}
            required
          />

          <select
            name="systemSize"
            value={form.systemSize}
            onChange={handleChange}
          >
            <option value="">
              Select Solar System Size
            </option>

            <option value="1kW">1 kW</option>
            <option value="2kW">2 kW</option>
            <option value="3kW">3 kW</option>
            <option value="5kW">5 kW</option>
            <option value="10kW+">10 kW+</option>
            <option value="Not Sure">Not Sure</option>
          </select>

          <textarea
            name="message"
            placeholder="Tell us about your requirement"
            value={form.message}
            onChange={handleChange}
          />

          <button
            className="primary-btn"
            type="submit"
          >
            Request Free Quote
            <ArrowRight size={18} />
          </button>

          {status && (
            <p className="form-status">
              {status}
            </p>
          )}

        </form>

      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2026 Filter Group Solar. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;