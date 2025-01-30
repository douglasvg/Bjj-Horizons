import React, { useState } from 'react';
    import Sidebar from './components/Sidebar';
    import VideoGrid from './components/VideoGrid';
    import Toggle from './components/Toggle';
    import VideoBanner from './components/VideoBanner';
    import './App.css';

    function App() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [filter, setFilter] = useState(null);
      const [uniformFilter, setUniformFilter] = useState('Gi');
      const [selectedVideo, setSelectedVideo] = useState(null);
      const [searchTerm, setSearchTerm] = useState('');

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const handleVideoSelect = (video) => {
        setSelectedVideo(video);
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
              <h1>Brazilian Jiu Jitsu Moves Platform</h1>
              <div className="toggle-and-add-container">
                <Toggle filter={uniformFilter} setFilter={setUniformFilter} />
              </div>
              {selectedVideo && <VideoBanner video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
              <input
                type="text"
                placeholder="Search videos..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <VideoGrid filter={filter} uniformFilter={uniformFilter} onVideoSelect={handleVideoSelect} searchTerm={searchTerm} />
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

    export default App;
