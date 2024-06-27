const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carriersRouter = require('./routes/carriers');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// mongoose.connect('mongodb://localhost:27017/carriers', { useNewUrlParser: true, useUnifiedTopology: true });
// Set up mongoose connection
mongoose.set('strictQuery', false);

const mongoDB = process.env.mongoUri;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log('Connected to database!!');
}

// Cors
const allowedOrigins = [process.env.clientUrl];

const corsOptions = {
  origin(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/carriers', carriersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
