const MongoDatabase = require("../../lib/MongoDatabase");

class DaoMongoProducts extends MongoDatabase {
    constructor(model) {
        super(model);
    }
}

module.exports = DaoMongoProducts;