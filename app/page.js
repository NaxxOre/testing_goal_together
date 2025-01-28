// app/page.js
"use client";

import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const videoLink = searchParams.get('video');

  // Extract the video ID from the YouTube link
  const getVideoId = (url) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
  };

  const videoId = videoLink ? getVideoId(videoLink) : null;

  return (
    <div>
      <h1>Client Panel</h1>
      {videoId ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No video selected</p>
      )}
    </div>
  );
}