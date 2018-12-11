const express = require("express");
const app = express();

//http error class

global.HTTPError = class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HTTPError";
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
  }
};

app.use(express.urlencoded());
app.use(express.json());

app.use(require("./routes"));

module.exports = app;
