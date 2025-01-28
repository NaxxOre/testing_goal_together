const express = require('express');
const { Video, CustomVideo } = require('../models/Video');
const router = express.Router();

// Submit a new video (Admin)
router.post('/submit', async (req, res) => {
    const { title, youtubeLink, thumbnail, customVideoLink } = req.body;
    try {
      const newVideo = new Video({ title, youtubeLink, thumbnail, customVideoLink });
      await newVideo.save();
      res.status(201).json(newVideo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit video' });
    }
  });
  

// Submit a new custom video (Pro Admin)
router.post('/prosubmit', async (req, res) => {
  const { name, videoLink } = req.body;
  try {
    const newCustomVideo = new CustomVideo({ name, videoLink });
    await newCustomVideo.save();
    res.status(201).json(newCustomVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit custom video' });
  }
});

// Fetch all videos (Client)
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Fetch all custom videos (Admin)
router.get('/customvideos', async (req, res) => {
  try {
    const customVideos = await CustomVideo.find();
    res.status(200).json(customVideos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch custom videos' });
  }
});

// Fetch a specific video by ID (Client)
router.get('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

module.exports = router;