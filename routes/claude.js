const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: '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',
});

async function main(query) {
  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: query }],
    model: 'claude-3-opus-20240229',
  });

  return message.content;
}

router.get('/claude', async (req, res) => {
  const query = req.query.text;

  if (!query) {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing query parameter "text"' });
  }

  try {
    const content = await main(query);
    res.json({ success: true, content });
  } catch (error) {
    console.error('Error creating Anthropic message:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Error creating Anthropic message' });
  }
});

module.exports = router;
