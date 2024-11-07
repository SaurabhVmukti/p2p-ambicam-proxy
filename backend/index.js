const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');
const app = express();

// Middleware to enable CORS
app.use(cors());

// Routes
app.use('/api/proxy', require('./routes/proxy'));
app.use('/api/server-info', require('./routes/server-info'));
app.use('/api/proxy', require('./routes/eachproxy'));
app.use('/api/traffic', require('./routes/traffic'));
// app.use('/api/get-all-by-id', require('./routes/get-all-by-id'));
// app.use('/api/get-all-by-id-and-name', require('./routes/get-all-by-id-and-name'));
// app.use('/api/get-all-by-


// Start the Express server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
