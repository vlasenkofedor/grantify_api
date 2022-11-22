"use strict";

const fs = require("fs");
const path = require("path");
const responses = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (
    file.indexOf(".") !== 0 &&
    file !== "index.js" &&
    file.slice(-3) === ".js"
  ) {
    responses[file.slice(0, -3)] = require(path.join(__dirname, file));
  }
});

module.exports = responses;
