const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const createError = require('http-errors');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');

dotenv.config();

const app = express();

//connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    dbname: 'note_db',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('successfully connected to database');
  })
  .catch((error) => {
    console.log({ mongodb_error: error.message });
  });

//configure middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configure routes
app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

app.get('*', (req, res) => {
  throw createError(404, 'PAGE NOT FOUND');
});

//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
