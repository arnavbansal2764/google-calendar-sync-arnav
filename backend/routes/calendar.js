const express = require('express');
const User = require('../models/User');
const axios = require('axios');

const router = express.Router();

router.post('/create-event', async (req, res) => {
    const { eventName, date, time } = req.body;
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const eventDateTime = `${date}T${time}:00`;
    const event = {
        summary: eventName,
        start: { dateTime: eventDateTime, timeZone: 'America/Los_Angeles' },
        end: { dateTime: eventDateTime, timeZone: 'America/Los_Angeles' },
    };

    try {
        const response = await axios.post(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            event,
            {
                headers: { Authorization: `Bearer ${user.accessToken}` },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create event', error });
    }
});
async function refreshAccessToken(user) {
    try {
        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                refresh_token: user.refreshToken,
                grant_type: 'refresh_token',
            }
        );
        // Update user's access token in the database
        user.accessToken = response.data.access_token;
        await user.save();
        return response.data.access_token;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw new Error('Unable to refresh access token');
    }
}
router.get('/events', async (req,res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: 'Unauthorized Bhencho' });

    try {
        const response = await axios.get(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            {
                headers: { Authorization: `Bearer ${user.accessToken}` },
            }
        );
        res.json(response.data.items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events', error });
    }
});
router.put('/update-event/:id', async (req, res) => {
    const { id } = req.params;
    const { eventName, date, time } = req.body;
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const eventDateTime = `${date}T${time}:00`;
    const event = {
        summary: eventName,
        start: { dateTime: eventDateTime, timeZone: 'America/Los_Angeles' },
        end: { dateTime: eventDateTime, timeZone: 'America/Los_Angeles' },
    };

    try {
        const response = await axios.put(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
            event,
            {
                headers: { Authorization: `Bearer ${user.accessToken}` },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update event', error });
    }
});

router.delete('/delete-event/:id', async (req, res) => {
    const { id } = req.params;
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    try {
        await axios.delete(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
            {
                headers: { Authorization: `Bearer ${user.accessToken}` },
            }
        );
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete event', error });
    }
});


module.exports = router;