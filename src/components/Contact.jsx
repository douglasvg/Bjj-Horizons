import React, { useState, useEffect } from 'react';
    import Sidebar from './Sidebar';
    import './Contact.css';

    function Contact() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setFilter={setFilter} />
          <div className={`content-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="content-header">
              <h1>Contact Us</h1>
            </div>
            <div className="contact-info">
              <p>If you have any questions, please send an email to <a href="mailto:contact@bjjhorizons.com">contact@bjjhorizons.com</a></p>
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
