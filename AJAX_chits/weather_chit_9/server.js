const express = require('express');

// Create app
const app = express();

// Serve all files (HTML + JSON)
app.use(express.static(__dirname));

app.listen(3000, console.log("Server listening on Port 3000."));