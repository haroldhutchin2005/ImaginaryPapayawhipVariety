const express = require('express');
const fs = require('fs').promises;
const { G4F } = require('g4f');

const router = express.Router();
const g4f = new G4F();

router.get('/gptconvo', async (req, res) => {
    const ask = req.query.ask;
    const id = req.query.id;

    if (!ask || !id) {
        return res.status(400).json({ error: 'Both "ask" and "id" parameters are required' });
    }

    let messages = [];

    try {
        const data = await fs.readFile(`./${id}.json`, 'utf8');
        messages = JSON.parse(data);
    } catch (error) {
        messages = [
            { role: "system", content: "You're a math teacher." },
        ];
    }

    messages.push({ role: "user", content: ask });

    try {
        const response = await g4f.chatCompletion(messages);
        messages.push({ role: "assistant", content: response });
        
        await fs.writeFile(`./${id}.json`, JSON.stringify(messages, null, 2));
        
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
