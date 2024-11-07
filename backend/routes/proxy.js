const router = require('express').Router();
const axios = require('axios');
const https = require('https');
// const app = express();


// Create an https agent to disable SSL certificate validation
const agent = new https.Agent({
    rejectUnauthorized: false
});

// Define your route to handle the Axios request
router.get('/type/:name', async (req, res) => {
    const { name } = req.params;

    try {
        // Make the request to the external API with the custom agent
        const response = await axios.get(`https://p2p.ambicam.com:7201/api/proxy/${name}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': process.env.AUTHORIZATION_KEY, // Ensure this header is allowed by the server
            },
            httpsAgent: agent // Bypass SSL certificate verification
        });
        // console.log('Response from external API:', response.data);

        // Send the response data back to the frontend
        res.json(response.data);

    } catch (error) {
        console.error('Error making API request:', error.message);

        // Send the error response to the frontend
        res.status(500).json({ message: 'Error fetching data from proxy', error: error.message });
    }
});

module.exports = router;
