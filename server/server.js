const express = require(`express`);
const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`);
const path = require(`path`);

dotenv.config();

const mountainsRouter = require(`./routes/mountainsRoutes`);
const usersRouter = require(`./routes/usersRoutes`);

mongoose
  .connect(
    `mongodb+srv://felipeaocampo:${process.env.DB_PASSWORD}@snowmies.5l8xmva.mongodb.net/snowmies?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`Databse also CONNECTED!!`);
  });

const app = express();

// GENERAL MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SERVING THE REACT/JS/CSS FILES (THANKS TO WEBPACK)
app.get(`/`, (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '..', 'index.html'));
});

//ROUTES
app.use(`/api/mountains`, mountainsRouter);
app.use(`/api/users`, usersRouter);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const customError = {
    log: `Error! Something went wrong`,
    message: err,
  };

  const newError = Object.assign(customError, err);

  return res.status(500).json(newError);
});

app.listen(3000, () => {
  console.log(`Server now CONNECTED on port 3000`);
});
