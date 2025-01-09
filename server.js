// Import Express
const express = require('express');
const app = express();

// Define a route
app.get('/', (req, res) => {
    res.send('Joseph Smith');
});

// Start the server
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
