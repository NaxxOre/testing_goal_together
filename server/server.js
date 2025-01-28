const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const videoRoutes = require('./routes/videos'); // Ensure this file exists and is properly configured

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/videoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test route to verify the server is running
app.get('/test', (req, res) => {
  res.send('Server is working on port 5000!');
});

// Main API routes
app.use('/api', videoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
