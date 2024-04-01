const express = require('express');
const { gptweb } = require('gpti');

const router = express.Router();

router.get('/gpt', async (req, res) => {
  try {
    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    gptweb({ prompt, markdown: false }, (err, data) => {
      if (err !== null) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const resultWithoutImages = {
          gptResult: data,
        };

        res.json({ result: resultWithoutImages });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
