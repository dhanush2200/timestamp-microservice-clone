// server.js — Express backend for timestamp microservice
const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// Root - serves index.html from /public
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// API root - return current time
app.get('/api', (req, res) => {
const now = new Date();
res.json({ unix: now.getTime(), utc: now.toUTCString() });
});


// API with date parameter
app.get('/api/:date', (req, res) => {
const dateParam = req.params.date;


// If the parameter is only digits, treat it as a number (unix timestamp in ms)
// Note: many FCC solutions assume digits mean milliseconds. This preserves that.
const isDigits = /^\d+$/.test(dateParam);
let date;


if (isDigits) {
// parse integer and create date (milliseconds)
date = new Date(parseInt(dateParam));
} else {
// Try to parse as an ISO date string
date = new Date(dateParam);
}


if (date.toString() === 'Invalid Date') {
return res.json({ error: 'Invalid Date' });
}


res.json({ unix: date.getTime(), utc: date.toUTCString() });
});


// Start server
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});