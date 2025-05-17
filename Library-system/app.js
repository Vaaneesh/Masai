const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const libraryRoutes = require('./routes/library.routes');
const app = express();

connectDB();

app.use(bodyParser.json());
app.use('/library', libraryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
