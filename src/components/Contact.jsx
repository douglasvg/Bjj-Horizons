import React, { useState } from 'react';
    import Sidebar from './Sidebar';
    import './Contact.css';

    function Contact() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [formData, setFormData] = useState({ name: '', email: '', message: '' });
      const [formStatus, setFormStatus] = useState('');

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const setFilter = () => {
        // Dummy function to prevent errors
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('Sending...');
        try {
          const response = await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          const result = await response.json();
          setFormStatus(result.message || result.error);
          setFormData({ name: '', email: '', message: '' });
        } catch (error) {
          setFormStatus('Failed to send email');
        }
      };

      return (
        <div className="app-container">
          <button className={`burger-icon ${isSidebarOpen ? 'close' : ''}`} onClick={toggleSidebar}>
            {isSidebarOpen ? '✕' : '☰'}
          </button>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setFilter={setFilter} />
          <div className={`content-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="content-header">
              <h1>Contact Us</h1>
            </div>
            <div className="contact-form">
              <p>Please use the form below to contact us:</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <button type="submit">Send Message</button>
                {formStatus && <p>{formStatus}</p>}
              </form>
              <p className="contact-email-message">Or send an email directly to contact@bjjhorizons.com</p>
            </div>
          </div>
          <footer className="app-footer">
            <p>Videos featured on this site are sourced from YouTube and comply with YouTube's Terms of Service and API policies. This site does not claim ownership of the videos. If you have concerns or wish to request removal, please contact us.</p>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/faq">FAQ</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/contact">Contact Us</a>
            </div>
          </footer>
        </div>
      );
    }

    export default Contact;
