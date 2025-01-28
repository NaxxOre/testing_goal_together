'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import video.js styles
import '@videojs/http-streaming'; // Import HLS plugin for video.js

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [volume, setVolume] = useState(50);
  const [frameType, setFrameType] = useState('circle');
  const [zoom, setZoom] = useState(1.77);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);
  const customPlayerRef = useRef(null);
  const [customPlayer, setCustomPlayer] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`https://testing-goal-together-3.onrender.com/api/videos/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error('Failed to fetch video:', error);
      }
    };
    fetchVideo();
  }, [id]);

  const initializePlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: video.youtubeLink.match(/(?:v=|live\/)([a-zA-Z0-9_-]+)/)[1],
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(volume);
          if (!isMuted) event.target.unMute();
        },
      },
    });
  };

  useEffect(() => {
    if (video) {
      if (window.YT && window.YT.Player) {
        initializePlayer();
      } else {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = initializePlayer;
      }
    }
  }, [video]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted]);

  // Initialize the custom video player with HLS support
  useEffect(() => {
    if (video?.customVideoLink && customPlayerRef.current) {
      const newCustomPlayer = videojs(customPlayerRef.current, {
        autoplay: true, // Ensure video starts automatically
        controls: true,
        fluid: true, // Makes the player responsive
        preload: 'auto',
        sources: [
          {
            src: video.customVideoLink, // HLS stream URL
            type: 'application/x-mpegURL', // HLS MIME type
          },
        ],
      });

      setCustomPlayer(newCustomPlayer);

      // Cleanup to dispose the player when the component unmounts or video changes
      return () => {
        if (newCustomPlayer) {
          newCustomPlayer.dispose();
        }
      };
    }
  }, [video?.customVideoLink]); // Only trigger the effect when the custom video link changes

  if (!video) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
      {/* Left Side - YouTube Video */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>{video.title}</h1>
        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            width: '300px',
            height: '300px',
            borderRadius: frameType === 'circle' ? '50%' : '0',
            overflow: 'hidden',
            border: '2px solid black',
          }}
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <div id="youtube-player" />
          </div>
        </div>

        {/* Play and Subscribe Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <button
            onClick={() => playerRef.current?.playVideo()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff0000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Play
          </button>
          <button
            onClick={() => alert('Subscribed!')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#008000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Subscribe
          </button>
        </div>

        {/* Volume Control Adjuster */}
        <div style={{ marginBottom: '20px' }}>
          <label>Volume Control:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        {/* Mute/Unmute Button */}
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>

        {/* Frame Type Choose Option */}
        <div style={{ marginBottom: '20px' }}>
          <label>Choose Frame Type: </label>
          <select value={frameType} onChange={(e) => setFrameType(e.target.value)}>
            <option value="circle">Circle</option>
            <option value="original">Original (Rectangular)</option>
          </select>
        </div>

        {/* Zoom Video Adjuster */}
        <div>
          <label>Zoom Video: </label>
          <input
            type="range"
            min="1.77"
            max="2"
            step="0.01"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Right Side - Custom Video */}
      <div style={{ flex: 1 }}>
        <h2>Custom Video</h2>
        {video.customVideoLink ? (
          <div data-vjs-player>
            <video
              ref={customPlayerRef}
              className="video-js vjs-big-play-centered"
              style={{
                width: '100%',
                height: '300px',
              }}
            />
          </div>
        ) : (
          <p>No custom video available.</p>
        )}
      </div>
    </div>
  );
}
