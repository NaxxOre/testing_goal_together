const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeLink: { type: String },
  thumbnail: { type: String },
  customVideoLink: { type: String }, // Field for custom video link
});

const customVideoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  videoLink: { type: String, required: true },
});

module.exports = {
  Video: mongoose.model('Video', videoSchema),
  CustomVideo: mongoose.model('CustomVideo', customVideoSchema),
};
