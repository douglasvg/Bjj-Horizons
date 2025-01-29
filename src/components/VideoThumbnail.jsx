import React, { useEffect, useState } from 'react';

    function VideoThumbnail({ video, onVideoSelect }) {
      console.log("VideoThumbnail rendering with video:", video);
      const [title, setTitle] = useState(video?.title || 'Untitled Video');
      const [creator, setCreator] = useState(video?.creator || 'Unknown Creator');
      const videoId = video?.link?.split('v=')[1];
      const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';

      useEffect(() => {
        if (!videoId) {
          console.error("Invalid video link:", video?.link);
          return;
        }
        const fetchVideoDetails = async () => {
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
