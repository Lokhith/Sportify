const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const Booking = require('./models/Booking');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the Frontend directory
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// MongoDB connection URL
const url = 'mongodb+srv://admin:admin%40123@cluster0.pxubscw.mongodb.net/Turf?retryWrites=true&w=majority'; // Replace with your MongoDB URL

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Route to get booked slots for a specific date
app.get('/api/bookings/:date', async (req, res) => {
  const date = req.params.date;
  try {
    const booking = await Booking.findOne({ date });
    if (booking) {
      res.json(booking.slots);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to book slots
app.post('/api/bookings', async (req, res) => {
  const { date, slots } = req.body;
  if (!date || !slots || !Array.isArray(slots)) {
    return res.status(400).send('Date and slots are required');
  }

  try {
    const booking = await Booking.findOne({ date });
    if (booking) {
      // Check if any of the requested slots are already booked
      const alreadyBooked = slots.some(slot => booking.slots.includes(slot));
      if (alreadyBooked) {
        return res.status(409).json({ success: false, message: 'Some slots are already booked.' });
      }

      // Add new slots to the existing booking
      booking.slots.push(...slots);
      await booking.save();
    } else {
      // Create a new booking document
      const newBooking = new Booking({ date, slots });
      await newBooking.save();
    }

    res.status(201).json({ success: true, message: 'Slots booked successfully.' });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
