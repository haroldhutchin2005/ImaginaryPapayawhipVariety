const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/dalle', async (req, res) => {
    const query = req.query.text;

    try {
        const response = await axios.get(`https://aemt.me/dalle?text=${query}`, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'image/jpeg',
            },
        });

        res.set('Content-Type', 'image/jpeg');

        res.send(response.data);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Error fetching images');
    }
});

module.exports = router;
