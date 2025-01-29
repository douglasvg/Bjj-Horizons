import React from 'react';
    import './VideoModal.css';

    function VideoModal({ video = {}, onClose }) {
      const urlParams = new URLSearchParams(new URL(video.link || "").search);
      const videoId = urlParams.get('v');

      console.log("Video link:", video.link);
      console.log("Extracted videoId:", videoId);

      if (!videoId) {
        console.error("Invalid YouTube link: Unable to extract videoId");
        return <div className="video-modal"><div className="modal-content">Invalid video link</div></div>;
      }

      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      console.log("Embed URL:", embedUrl);

      return (
        <div className="video-modal">
          <div className="modal-content">
            <button className="close-modal-button" onClick={onClose}>
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
              <h2>{video.title || 'Untitled Video'}</h2>
              <p>Creator: {video.creator || 'Unknown Creator'}</p>
              <p>Category: {video.technique_category || 'Unknown Category'}</p>
              <p>Position: {video.position || 'Unknown Position'}</p>
            </div>
          </div>
        </div>
      );
    }

    export default VideoModal;
