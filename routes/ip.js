const express = require('express');
const { ip } = require('nayan-server');

const router = express.Router();

router.get('/ip', async (req, res) => {
  const { ipnum } = req.query;

  if (!ipnum) {
    return res.status(400).json({ error: 'Missing ipnum parameter' });
  }

  try {
    const data = await ip(ipnum);

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
