import React, { useState } from 'react';
    import Sidebar from './Sidebar';
    import './Contact.css';

    function Contact() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [message, setMessage] = useState('');
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
          const response = await fetch('/.netlify/functions/contact-form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
          });

          if (response.ok) {
            setFormStatus('Message sent successfully!');
            setName('');
            setEmail('');
            setMessage('');
          } else {
            const errorData = await response.json();
            console.error('Failed to send email:', errorData);
            setFormStatus('Failed to send message. Please try again.');
          }
        } catch (error) {
          console.error('Error sending email:', error);
          setFormStatus('Failed to send message. Please try again.');
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
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
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
