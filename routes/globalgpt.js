// apiRoutes.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

let requestCount = 0;

router.get('/globalgpt', async (req, res) => {
  try {
    const content = req.query.content;
    const apiUrl = `https://api.easy-api.online/v1/globalgpt?q=${content}`;
    
    // Make a request using Axios to the new API endpoint
    const response = await axios.get(apiUrl);

    // Increment request count
    requestCount++;

    // Extract the relevant information from the response
    const responseData = response.data;

    // Create JSON response with the content from the new API and requestCount
    const jsonResponse = {
      content: responseData.content,
      requestCount: requestCount,
    };

    // Record request count and response details in a JSON for logging
    const logEntry = {
      timestamp: new Date(),
      requestCount: requestCount,
      requestDetails: {
        content: content,
        apiUrl: apiUrl,
      },
      response: jsonResponse,
    };

    // Log the entry (you might want to store it in a database or file)
    console.log(JSON.stringify(logEntry, null, 2));

    // Send the response
    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
