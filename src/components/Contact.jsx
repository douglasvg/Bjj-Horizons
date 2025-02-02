import React, { useState, useEffect } from 'react';
    import Sidebar from './Sidebar';
    import './Contact.css';

    function Contact() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 769);

      useEffect(() => {
        const handleResize = () => {
          setIsSidebarOpen(window.innerWidth >= 769);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const setFilter = () => {
        // Dummy function to prevent errors
      };

      return (
        <div className="app-container">
          {!isSidebarOpen && (
            <button className="burger-icon" onClick={toggleSidebar}>
              ☰
            </button>
          )}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setFilter={setFilter} showCategories={false} />
          <div className={`content-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="content-header">
              <h1>Contact Us</h1>
            </div>
            <div className="contact-form">
              <p>Please use the form below to contact us:</p>
              <form>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button type="submit">Send Message</button>
              </form>
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
