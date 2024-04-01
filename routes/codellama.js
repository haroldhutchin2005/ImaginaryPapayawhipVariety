const express = require('express');
const { RsnChat } = require("rsnchat");

const router = express.Router();
const rsnchat = new RsnChat("rsnai_xjkAMD3KPpEoljmdjCSIn014");

router.get('/cl', async (req, res) => {
  const { ques } = req.query;

  if (!ques) {
    return res.status(400).json({ error: 'Missing query parameter "ques"' });
  }

  try {
    const response = await rsnchat.codellama(ques);
    res.json({ message: response.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
