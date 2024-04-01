const express = require('express');
const { getJson } = require('serpapi');

const searchRouter = express.Router();

searchRouter.get('/gs', async (req, res) => {
  try {
    const query = req.query.q || 'biology';
    const apiKey = 'be63a121d0d63b0faa8188c4069c77e90bcab302c79a01e1fc58f1cc1776282e';

    getJson({
      engine: 'google_scholar',
      q: query,
      api_key: apiKey,
    }, (json) => {
      const organicResults = json['organic_results'];
      res.json({ organicResults });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = searchRouter;
