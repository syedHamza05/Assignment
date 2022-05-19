const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { logger } = require("../services/logger");
const { SERVER } = require("../config/environment");

global.P = require("bluebird");

const mongoConnect = async function() {
    return new Promise((resolve, reject) => {
        let dbUrl = SERVER.MONGO.DB_URL;
        mongoose.connect(dbUrl, SERVER.MONGO.OPTIONS, (error, _result) => {
            if (error) {
                console.err(error);
                return reject(error);
            } else {
                console.log("Mongo Db successfully connected!")
                return resolve('Db successfully connected!');
            }
        });
    });
};
autoIncrement.initialize(mongoose);

module.exports = {mongoConnect };