import React, { useEffect, useState } from 'react';
    import VideoThumbnail from './VideoThumbnail';
    import './VideoGrid.css';

    function VideoGrid({ filter, uniformFilter, onVideoSelect, searchTerm }) {
      const [videos, setVideos] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const videosPerPage = 20;

      useEffect(() => {
        const fetchVideos = async () => {
          try {
            const supabaseUrl = 'https://yngcpnxyjyhyglxybdgz.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZ2Nwbnh5anloeWdseHliZGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTgyMTIsImV4cCI6MjA1MjQzNDIxMn0.ds7_eUS0pAXqDbvbAwsi-BPrfEwCi4vNKAK0xEPSBp0';

            let query = `${supabaseUrl}/rest/v1/videos?`;

            if (filter) {
              const [category, subcategory] = filter.split(' -> ');
              if (category) query += `technique_category=eq.${category}&`;
              if (subcategory && subcategory !== "All") query += `position=eq.${subcategory}&`;
            }

            if (uniformFilter) {
              query += `uniform=eq.${uniformFilter}&`;
            }

            if (searchTerm) {
              query += `name=ilike.*${searchTerm}*&`;
            }

            const startIndex = (currentPage - 1) * videosPerPage;
            query += `limit=${videosPerPage}&offset=${startIndex}`;

            const response = await fetch(query, {
              headers: {
                'apikey': supabaseKey,
                'Content-Type': 'application/json'
              }
            });

            if (!response.ok) {
              const responseText = await response.text();
              console.error("Supabase API Error:", response.status, responseText);
              throw new Error(`HTTP error! Status: ${response.status}, ${responseText}`);
            }

            const data = await response.json();
            setVideos(Array.isArray(data) ? data : []);
          } catch (error) {
            console.error('Error fetching videos:', error);
            setVideos([]);
          }
        };

        fetchVideos();
      }, [filter, uniformFilter, searchTerm, currentPage]);

      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

      const handleNextPage = () => {
        if (videos.length === videosPerPage) {
          setCurrentPage(currentPage + 1);
        }
      };

      return (
        <div>
          <div className="video-grid">
            {videos.map(video => (
              <VideoThumbnail key={video.id} video={video} onVideoSelect={onVideoSelect} />
            ))}
          </div>
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &lt;
            </button>
            <button onClick={handleNextPage} disabled={videos.length < videosPerPage}>
              &gt;
            </button>
          </div>
        </div>
      );
    }

    export default VideoGrid;
