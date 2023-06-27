const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const history = require('connect-history-api-fallback');


mongoose.set("useCreateIndex", true);
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });


app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan("dev"));


const userRoutes = require("./api/user/route/user");
app.use(userRoutes);

const crimeRoutes = require("./api/crime/route/crime");
app.use(crimeRoutes);

app.use(history({
  index: '/index.html'
}));

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
