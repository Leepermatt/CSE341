const express = require('express');
const homeRoute = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;




app.use('/', homeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
