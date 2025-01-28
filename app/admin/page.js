'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [customVideos, setCustomVideos] = useState([]);
  const [selectedCustomVideo, setSelectedCustomVideo] = useState('');

  useEffect(() => {
    const fetchCustomVideos = async () => {
      try {
        const response = await axios.get('https://testing-goal-together-3.onrender.com/api/customvideos');
        setCustomVideos(response.data);
      } catch (error) {
        console.error('Failed to fetch custom videos:', error);
      }
    };
    fetchCustomVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required!');
      return;
    }

    try {
      // Fetch the selected custom video details
      const customVideo = customVideos.find((video) => video.videoLink === selectedCustomVideo);

      // Submit the video (YouTube or custom)
      await axios.post('https://testing-goal-together-3.onrender.com/api/submit', {
        title,
        youtubeLink: youtubeLink || '', // Include if provided
        thumbnail: thumbnail || '', // Include if provided
        customVideoLink: customVideo ? customVideo.videoLink : '', // Include custom video link if selected
      });

      alert('Video submitted successfully!');
      setTitle('');
      setYoutubeLink('');
      setThumbnail('');
      setSelectedCustomVideo('');
    } catch (error) {
      alert('Failed to submit video');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* YouTube Link Input */}
        <input
          type="text"
          placeholder="YouTube Link (Optional)"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />

        {/* Thumbnail Input */}
        <input
          type="text"
          placeholder="Thumbnail URL (Optional)"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        {/* Custom Video Selection */}
        <h2>Select a Custom Video (Optional)</h2>
        <select
          value={selectedCustomVideo}
          onChange={(e) => setSelectedCustomVideo(e.target.value)}
        >
          <option value="">No custom video</option>
          {customVideos.map((video) => (
            <option key={video._id} value={video.videoLink}>
              {video.name}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
