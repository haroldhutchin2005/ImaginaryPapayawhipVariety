const express = require('express');
const { openai } = require('betabotz-tools');

const openaiRouter = express.Router();

openaiRouter.get('/chatgpt', async (req, res) => {
  const { input } = req.query;

  if (!input) {
    return res.status(400).json({ error: 'Input parameter is required' });
  }

  try {
    const results = await openai(input);

    // Modify the response: Remove "creator" and replace with "Jonell Magallanes"
    const modifiedResults = { ...results, creator: 'Jonell Magallanes' };

    console.log(modifiedResults); // Log the modified results to the console
    res.json(modifiedResults); // Send the modified results as JSON response
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = openaiRouter;
