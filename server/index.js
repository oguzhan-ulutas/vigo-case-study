const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carriersRouter = require('./routes/carriers');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/carriers', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.use('/carriers', carriersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
