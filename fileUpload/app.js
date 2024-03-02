const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set up static files directory
app.use('/fileUpload/static', express.static(path.join(__dirname, 'static')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'fileUpload.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`YAYY LESGOOO Server is running on http://localhost:${port}`);
});
