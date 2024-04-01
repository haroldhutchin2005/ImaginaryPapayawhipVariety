const express = require('express');
const { spotify } = require('nayan-server');

const router = express.Router();

router.get('/spotify', async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'Missing search parameter' });
  }

  try {
    const data = await spotify(search);
    const sanitizedData = { ...data };
    delete sanitizedData.developer;
    delete sanitizedData.devfb;
    delete sanitizedData.devwp;

    console.log(sanitizedData);
    res.json(sanitizedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
