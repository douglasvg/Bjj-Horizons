import React, { useState, useEffect } from 'react';
    import './VideoFormModal.css';

    function VideoFormModal({ onClose }) {
      const [videoLink, setVideoLink] = useState('');
      const [videoTitle, setVideoTitle] = useState('');
      const [videoAuthor, setVideoAuthor] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [situation, setSituation] = useState('');
      const [position, setPosition] = useState('');
      const [thumbnailUrl, setThumbnailUrl] = useState('');
      const [uniform, setUniform] = useState('Gi');

      const categories = [
        "Guard Pass",
        "Takedown",
        "Guard Pull",
        "Submission",
        "Sweep",
        "Defense / Escape",
        "Guard Control",
      ];

      const positions = [
        "Not Specific",
        "Stand Up",
        "Closed Guard",
        "De La Riva Guard",
        "Reverse De La Riva Guard",
        "Half Guard",
        "X Guard",
        "Spider Guard",
        "Lasso Guard",
        "50/50 Guard",
        "Butterfly Guard",
        "Worm Guard",
        "Waiter Guard",
        "Mount",
        "Back Control",
        "Side Control",
      ];

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

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setThumbnailUrl('');

        const videoId = extractVideoId(videoLink);

        if (!videoId) {
          setError("Invalid YouTube link");
          setLoading(false);
          return;
        }

        try {
          const apiKey = 'AIzaSyBqxY4etLph6cA_Ac4tun2-DIaL1p5qPWQ';
          const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            setVideoTitle(data.items[0].snippet.title);
            setVideoAuthor(data.items[0].snippet.channelTitle);
            setThumbnailUrl(data.items[0].snippet.thumbnails.high.url);
          } else {
            setError("Could not fetch video details");
          }
        } catch (err) {
          console.error("Error fetching video details:", err);
          setError("Error fetching video details");
        } finally {
          setLoading(false);
        }
      };

      const handleAddVideo = async () => {
        if (!videoTitle || !videoAuthor || !situation || !position) {
          setError("Please add a video link and select a situation and position");
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const supabaseUrl = 'https://yngcpnxyjyhyglxybdgz.supabase.co';
          const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZ2Nwbnh5anloeWdseHliZGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTgyMTIsImV4cCI6MjA1MjQzNDIxMn0.ds7_eUS0pAXqDbvbAwsi-BPrfEwCi4vNKAK0xEPSBp0';

          const newVideo = {
            link: videoLink,
            name: videoTitle,
            created_by: videoAuthor,
            technique_category: situation,
            position: position,
            uniform: uniform,
          };

          console.log("Sending video to Supabase:", newVideo);

          const response = await fetch(`${supabaseUrl}/rest/v1/videos`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(newVideo),
          });

          if (!response.ok) {
            const responseText = await response.text();
            console.error("Supabase API Error:", response.status, responseText);
            throw new Error(`HTTP error! Status: ${response.status}, ${responseText}`);
          }

          const data = await response.json();
          console.log("Video added to Supabase:", data);
          onClose();
        } catch (err) {
          console.error("Error adding video to Supabase:", err);
          setError("Error adding video to Supabase");
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="video-form-modal">
          <div className="modal-content">
            <button className="close-modal-button" onClick={onClose}>
              ✕
            </button>
            <h2>Add YouTube Video</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter YouTube video link"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Details'}
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
            {videoTitle && videoAuthor && (
              <div className="video-info">
                {thumbnailUrl && (
                  <img src={thumbnailUrl} alt="Video Thumbnail" className="form-thumbnail" />
                )}
                <p>Title: {videoTitle}</p>
                <p>Author: {videoAuthor}</p>
                <select
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  required
                >
                  <option value="">Select Situation</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                >
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                <div className="toggle-container">
                  <span className={uniform === 'Gi' ? 'active' : ''}>Gi</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={uniform === 'No-Gi'}
                      onChange={() => setUniform(uniform === 'Gi' ? 'No-Gi' : 'Gi')}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className={uniform === 'No-Gi' ? 'active' : ''}>No-Gi</span>
                </div>
                <button className="add-video-button" onClick={handleAddVideo} disabled={loading}>
                  {loading ? 'Adding...' : 'Add Video'}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    export default VideoFormModal;
