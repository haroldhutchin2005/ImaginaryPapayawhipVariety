const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/am', async (req, res) => {
    try {
        const alightLink = req.query.alightlink;

        if (!alightLink) {
            return res.status(400).json({ error: 'Alight Motion link is required.' });
        }

        const { data } = await axios.get(alightLink);
        const $ = cheerio.load(data);
        
        const title = $('title').text();
        const ogTitle = $('meta[property="og:title"]').attr('content');
        const ogImage = $('meta[property="og:image"]').attr('content');
        const ogDescription = $('meta[property="og:description"]').attr('content');
        const importLink = $('a.button').attr('href');
        
        const scrapedData = {
            title,
            ogTitle,
            ogImage,
            ogDescription,
            importLink
        };

        res.json(scrapedData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scrape the data.' });
    }
});

module.exports = router;
  
