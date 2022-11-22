"use strict";

const fs = require("fs"),
    path = require("path"),
    Sequelize = require("sequelize"),
    db = {},
    {
        dbUserName,
        dbPassword,
        dbDatabase,
        dbPort,
        dbHost,
        dbDialect,
        dbBenchmark,
        dbLogQueryParameters
    } = process.env,
    sequelize = new Sequelize(dbDatabase, dbUserName, dbPassword, {
        port: dbPort,
        host: dbHost,
        dialect: dbDialect,
        benchmark: dbBenchmark,
        logQueryParameters: dbLogQueryParameters
    });


fs.readdirSync(__dirname).forEach((file) => {
    if (file.indexOf(".") !== 0 && file.slice(-8) === "Model.js") {
        try {
            const model = require(path.join(__dirname, file))(
                sequelize,
                Sequelize.DataTypes
            );
            db[model.name] = model;
        } catch (e) {
            console.log("================ERROR====================");
            console.log(path.join(__dirname, file));
            console.log(e);
            console.log("===========================================");
        }
    }
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
