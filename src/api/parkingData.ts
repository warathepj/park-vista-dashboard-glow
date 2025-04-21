import { setLatestParkingData } from './parkingData';

// Create an Express router to handle the API endpoint
const express = require('express');
const router = express.Router();

router.post('/api/parking-data', (req, res) => {
  try {
    const parkingData = req.body;
    setLatestParkingData(parkingData);
    res.json({ success: true, message: 'Parking data updated successfully' });
  } catch (error) {
    console.error('Error processing parking data:', error);
    res.status(500).json({ success: false, message: 'Failed to process parking data' });
  }
});

export default router;
