const express = require('express');
const axios = require('axios');

const router = express.Router();

let requestCount = 0;

router.get('/aipin', async (req, res) => {
  try {
    requestCount++;

    const { content } = req.query;


    const [aiApiResponse, pinApiResponse] = await Promise.all([
      axios.get(`https://cc-project-apis-jonell-magallanes.onrender.com/api/ai?question=${content}`),
      axios.get(`https://cc-project-apis-jonell-magallanes.onrender.com/api/pin?title=${content}&count=10`)
    ]);

    const combinedResponse = {
      aiResponse: aiApiResponse.data,
      pinResponse: pinApiResponse.data
    };

    console.log(`Request #${requestCount}: AI Response -`, aiApiResponse.data);
    console.log(`Request #${requestCount}: Pin Response -`, pinApiResponse.data);

    res.json(combinedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
