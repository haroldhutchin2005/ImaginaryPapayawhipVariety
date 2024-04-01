const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/tiktok/searchvideo', async (req, res, next) => {
    var search = req.query.keywords;
    if (!search) return res.status(400).json({ error: 'Missing data to launch the program' });

    try {
        const response = await axios.post('https://www.tikwm.com/api/feed/search', {
            keywords: search
        });

        var data = response.data;
        if (data.data.videos.length === 0) {
            return res.status(404).json({ error: 'No videos found for the given search.' });
        }

        var randomIndex = Math.floor(Math.random() * data.data.videos.length);
        var randomVideo = data.data.videos[randomIndex];
        var result = {
            code: 0,
            msg: 'success',
            processed_time: 0.9624,
            data: {
                videos: [randomVideo]
            }
        };
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
