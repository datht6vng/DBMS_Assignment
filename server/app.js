"use strict";
require("dotenv").config();
var debug = require("debug")("my express app");
var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
var cors = require("cors");
var passport = require("passport");
var session = require("express-session");
var indexRouter = require("./routes/index");

var app = express();
// mongoose.connect(process.env.DATABASE_ADDRESS, (err) => {
//     if (!err) console.log("Mongoose Is Connected");
// });
// mongoose.connection.on("error", function(err) {
//     console.log("Connection failed: " + err);
// });
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
        origin: process.env.CLIENT_ADDRESS, // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport-config");
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({ message: err });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: err });
});

app.set("port", process.env.PORT);

var server = app.listen(app.get("port"), function() {
    console.log("Express server listening on port " + server.address().port);
});