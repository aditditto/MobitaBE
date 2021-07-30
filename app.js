var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
if (process.env.NODE_ENV !== "production") require("dotenv").config();

var indexRouter = require("./routes/index");
var storesRouter = require("./routes/stores");
var dorayakiRouter = require("./routes/dorayaki");
var imageRouter = require("./routes/image");

var app = express();

const mongoose = require("mongoose");
const mongo = process.env.MONGODB_URI || "mongodb://mongo:27017";
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to database");
});

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? new RegExp(process.env.FE_URL)
      : "*",
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// enable cors pre-flight for all routes
app.options("*", cors());

app.use("/", indexRouter);
app.use("/stores", storesRouter);
app.use("/dorayaki", dorayakiRouter);
app.use("/mongoImg", imageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});

module.exports = app;
