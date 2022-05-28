const FirestoreDatabase = require("../../lib/FirestoreDatabase");

class DaoFirestoreProducts extends FirestoreDatabase {
    constructor(firestore, collection) {
        super(firestore, collection);
     }
}

module.exports = DaoFirestoreProducts;