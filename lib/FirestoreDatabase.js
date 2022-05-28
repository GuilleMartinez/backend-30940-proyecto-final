const Database = require("./Database");

class FirestoreDatabase extends Database {
    
  constructor(firestore, collection) {
    super();
    this.collection = firestore.collection(collection);
  }

  async get() {
    const { docs } = await this.collection.get();
    return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async insertOne(attributes) {
    const doc = await this.collection.add(attributes);
    return await this.findOne(doc.id);
  }

  async findOne(id) {
    const doc = await this.collection.doc(id).get();
    const data = doc.data();
    return data ? { id: doc.id, ...data } : null;
  }

  async removeOne(id) {
    const item = await this.findOne(id);
    return item ? await this.collection.doc(id).delete() : null;
  }

  async updateOne(id, attributes) {
    const item = await this.findOne(id);
    return item ? await this.collection.doc(id).update(attributes) : null;
  }
}

module.exports = FirestoreDatabase;
