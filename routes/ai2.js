const express = require('express');
const { RsnChat } = require("rsnchat");

const router = express.Router();
const rsnchat = new RsnChat("rsnai_xjkAMD3KPpEoljmdjCSIn014");

router.get('/v2/ai', async (req, res) => {
  const { ask } = req.query;

  if (!ask) {
    return res.status(400).json({ error: 'Missing query parameter "ask"' });
  }

  try {
    const response = await rsnchat.gpt(ask);
    res.json({ message: response.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
