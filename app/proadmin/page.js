'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ProAdminPage() {
  const [name, setName] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://testing-goal-together-3.onrender.com/api/prosubmit', { name, videoLink });
      console.log('Response:', response.data); // Debugging log
      alert('Video submitted successfully!');
      setName('');
      setVideoLink('');
    } catch (error) {
      console.error('Error submitting video:', error); // Debugging log
      alert('Failed to submit video. Please check the console for details.');
    }
  };

  return (
    <div>
      <h1>Pro Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}