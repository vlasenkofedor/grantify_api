"use strict";

const fs = require("fs");
const path = require("path");

module.exports = (_) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file.indexOf(".") !== 0 && file.slice(-9) === "Events.js") {
      require(path.join(__dirname, file));
    }
  });
};
