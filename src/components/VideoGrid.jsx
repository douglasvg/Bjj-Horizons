import React, { useEffect, useState } from 'react';
    import VideoThumbnail from './VideoThumbnail';

    function VideoGrid({ filter, uniformFilter, onVideoSelect, searchTerm }) {
      const [videos, setVideos] = useState([]);

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
      }, [filter, uniformFilter, searchTerm]);

      return (
        <div className="video-grid">
          {videos.map(video => (
            <VideoThumbnail key={video.id} video={video} onVideoSelect={onVideoSelect} />
          ))}
        </div>
      );
    }

    export default VideoGrid;
