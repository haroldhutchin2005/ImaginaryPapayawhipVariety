const express = require('express');
const axios = require('axios');
const { gptweb } = require('gpti');

const router = express.Router();

router.get('/gpt2', async (req, res) => {
  try {
    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }
    const pinResponse = await axios.get(`https://jonellccapis-dbe67c18fbcf.herokuapp.com/api/pin?title=${prompt}&count=1`);

    const pinImages = pinResponse.data.data;

    gptweb({ prompt, markdown: false }, (err, data) => {
      if (err !== null) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const resultWithImages = {
          gptResult: data,
          pinImages,
        };

        res.json({ result: resultWithImages });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
