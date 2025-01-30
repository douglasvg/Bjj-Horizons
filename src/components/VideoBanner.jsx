import React, { useState, useEffect } from 'react';
    import './VideoBanner.css';

    function VideoBanner({ video, onClose }) {
      const videoId = video.link.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://localhost`;
      const [description, setDescription] = useState('');
      const [showFullDescription, setShowFullDescription] = useState(false);

      useEffect(() => {
        const fetchVideoDetails = async () => {
          try {
            const apiKey = 'AIzaSyBqxY4etLph6cA_Ac4tun2-DIaL1p5qPWQ';
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
              setDescription(data.items[0].snippet.description);
            }
          } catch (error) {
            console.error('Error fetching video details:', error);
          }
        };

        fetchVideoDetails();
      }, [videoId]);

      const limitedDescription = (desc) => {
        const lines = desc.split('\n');
        if (lines.length > 4 && !showFullDescription) {
          return lines.slice(0, 4).join('\n') + '...';
        }
        return desc;
      };

      const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
      };

      return (
        <div className="video-banner">
          <div className="banner-content">
            <button className="close-banner-button" onClick={onClose}>
              ✕
            </button>
            <div className="video-player">
              <iframe
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-details">
              <h2>{video.title}</h2>
              <p>Creator: {video.creator}</p>
              <p>Category: {video.technique_category}</p>
              <p>Position: {video.position}</p>
              <p>
                {limitedDescription(description)}
                {description.split('\n').length > 4 && (
                  <button className="read-more-button" onClick={toggleDescription}>
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      );
    }

    export default VideoBanner;
