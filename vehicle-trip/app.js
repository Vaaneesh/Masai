const express = require('express');
const mongoose = require('mongoose');
const vehicleRoutes = require('./routes/vehicleRoutes');
const { connectToDatabase } = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
connectToDatabase();
app.use('/api', vehicleRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
