import React, { useState, useEffect } from 'react';
    import './VideoBanner.css';

    function VideoBanner({ video, onClose }) {
      const [description, setDescription] = useState('');
      const [showFullDescription, setShowFullDescription] = useState(false);
      const [thumbnailUrl, setThumbnailUrl] = useState('');
      const [videoId, setVideoId] = useState('');

      useEffect(() => {
        const extractVideoId = (url) => {
          try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname === 'youtu.be') {
              return parsedUrl.pathname.substring(1);
            } else if (parsedUrl.hostname === 'www.youtube.com') {
              const urlParams = new URLSearchParams(parsedUrl.search);
              return urlParams.get('v');
            }
          } catch (e) {
            console.error("Error parsing URL:", e);
            return null;
          }
          return null;
        };

        const extractedId = extractVideoId(video.link);
        setVideoId(extractedId);
        if (extractedId) {
          const fetchVideoDetails = async () => {
            try {
              const apiKey = 'AIzaSyBqxY4etLph6cA_Ac4tun2-DIaL1p5qPWQ';
              const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${extractedId}&key=${apiKey}&part=snippet`);
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              if (data.items && data.items.length > 0) {
                setDescription(data.items[0].snippet.description);
                setThumbnailUrl(data.items[0].snippet.thumbnails.high.url);
              }
            } catch (error) {
              console.error('Error fetching video details:', error);
            }
          };
          fetchVideoDetails();
        }
      }, [video.link]);

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

      const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';

      return (
        <div className="video-banner">
          <div className="banner-content">
            <button className="close-banner-button" onClick={onClose}>
              ✕
            </button>
            {thumbnailUrl && (
              <div className="video-player">
                <iframe
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
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
