const express = require('express');
const axios = require('axios');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Received a request at ${new Date().toLocaleString()}`);
  next();
});

router.get('/bing', async (req, res) => {
  try {
    const content = encodeURIComponent(req.query.query || '');

    if (!content) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const apiUrl = `https://aemt.me/bingai?text=${content}`;

    const axiosResponse = await axios.get(apiUrl);

    if (!axiosResponse.data.status) {
      throw new Error('AI service returned an error');
    }

    const responseData = {
      request_count: 1,
      airesponse: axiosResponse.data.bing,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
        
