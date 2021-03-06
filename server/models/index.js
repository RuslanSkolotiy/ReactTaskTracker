const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.column = require("./column.model");
db.task = require("./task.model");
db.token = require("./token.model");

module.exports = db;
