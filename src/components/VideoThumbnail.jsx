import React, { useEffect, useState } from 'react';

    function VideoThumbnail({ video, onVideoSelect }) {
      const [title, setTitle] = useState(video.title || 'Untitled Video');
      const [creator, setCreator] = useState(video.creator || 'Unknown Creator');
      const [videoId, setVideoId] = useState('');
      const [thumbnailUrl, setThumbnailUrl] = useState('');

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
          setThumbnailUrl(`https://img.youtube.com/vi/${extractedId}/0.jpg`);
        }
      }, [video.link]);

      useEffect(() => {
        const fetchVideoDetails = async () => {
          if (!videoId) return;
          try {
            const apiKey = 'AIzaSyBqxY4etLph6cA_Ac4tun2-DIaL1p5qPWQ';
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
              setTitle(data.items[0].snippet.title);
              setCreator(data.items[0].snippet.channelTitle);
            }
          } catch (error) {
            console.error('Error fetching video details:', error);
          }
        };

        fetchVideoDetails();
      }, [videoId]);

      const handleThumbnailClick = () => {
        if (onVideoSelect) {
          onVideoSelect({ ...video, title, creator });
        }
      };

      return (
        <div className="video-thumbnail" onClick={handleThumbnailClick}>
          <img src={thumbnailUrl} alt={title} />
          <div className="video-info">
            <div className="video-title">{title}</div>
            <div className="video-creator">{creator}</div>
          </div>
        </div>
      );
    }

    export default VideoThumbnail;
