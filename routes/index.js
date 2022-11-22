"use strict";

const fs = require("fs");
const path = require("path");
const routes = [];

fs.readdirSync(__dirname).forEach((file) => {
  if (file.indexOf(".") !== 0 && file.slice(-9) === "Routes.js") {
    routes.push(...require(path.join(__dirname, file)));
  }
});

module.exports = routes;
