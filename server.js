const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const homeRoutes = require('./routes/index');

// Use routes
app.use('/', homeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
