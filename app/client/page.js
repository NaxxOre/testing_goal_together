'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ClientPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Client Page</h1>
      <div>
        {videos.map((video) => (
          <div key={video._id}>
            <img src={video.thumbnail} alt={video.title} />
            <h2>{video.title}</h2>
            <Link href={`/client/${video._id}`}>Watch Video</Link>
          </div>
        ))}
      </div>
    </div>
  );
}