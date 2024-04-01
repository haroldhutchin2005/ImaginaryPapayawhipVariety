const express = require('express');
const { removebg } = require('betabotz-tools');

const removebgRouter = express.Router();

removebgRouter.get('/rbg', async (req, res) => {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl parameter is required' });
  }

  try {
    const results = await removebg(imageUrl);
    console.log(results);
    res.json(results); 
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = removebgRouter;
