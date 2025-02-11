import React, { useState, useEffect } from 'react';
    import Sidebar from './Sidebar';
    import './About.css';

    function About() {
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
              <h1>About BJJ Horizons - The Brazilian Jiu Jitsu Moves Platform</h1>
            </div>
            <div className="about-content">
              <p>Welcome to BJJ Horizons, your go-to directory for learning Brazilian Jiu-Jitsu moves! Whether you're just stepping onto the mats or looking to refine your fundamentals, we provide a free, easy-to-use platform where you can explore the best Brazilian Jiu-Jitsu moves directly from YouTube.</p>

              <h2>Our Mission - Learn BJJ moves should be easy</h2>
              <p>At BJJ Horizons, we believe that learning BJJ moves should be accessible to everyone. That’s why we’ve built a comprehensive video directory that allows beginners to filter techniques by positions, submissions, escapes, and transitions. Our goal is to help you expand your game, improve faster, and build confidence in your Jiu-Jitsu journey.</p>

              <h2>Why We Created BJJ Horizons</h2>
              <p>Starting Brazilian Jiu-Jitsu can be overwhelming. Many beginners struggle with:</p>
              <ul>
                <li>Too much information – With thousands of Jiu-Jitsu moves online, it’s hard to know where to start.</li>
                <li>Lack of structured learning – Watching random videos doesn’t always lead to a complete game.</li>
                <li>Difficulty remembering techniques – Without proper organization, techniques are quickly forgotten.</li>
                <li>Finding beginner-friendly content – Some videos assume prior experience, making it tough for white belts.</li>
              </ul>
              <p>That’s why BJJ Horizons organizes techniques in a clear and structured way, so you can quickly find the best Brazilian Jiu-Jitsu moves that match your skill level and goals.</p>

              <h2>Start Exploring Today!</h2>
              <p>Ready to improve your game? Browse our curated directory and start mastering Brazilian Jiu-Jitsu moves today. Whether you're looking for the best BJJ moves to sharpen your defense or attack, BJJ Horizons is here to help you on your path to progress!</p>
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

    export default About;
