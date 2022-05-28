const Database = require("./Database");


class SQLDatabase extends Database {
  constructor(config, table, model) {
    super();
    this.database = {};
    this.table = table;
    this.model = model;
    this.initialize(config);
  }

  async initialize(config) {
    try {
      this.database = require("knex")(config);
      const exists = await this.database.schema.hasTable(this.table);
      if (!exists) {
        await this.database.schema.createTable(this.table, this.model);
      }
      console.log(`SQL Table "${this.table}" connected and ready to use ✔`);
    } catch (err) {
      console.log(
        `Error on initialize SQL table "${this.table}": ${err.message}. The server is shutting down.`
      );
      process.exit(1);
    }
  }

  async get() {
    return await this.database(this.table).select();
  }

  async insertOne(data) {
    const [id] = await this.database(this.table).insert(data);
    return await this.findOne(id);
  }

  async findOne(id) {
    const [item = null ] = await this.database(this.table).where({ id }).select();
    return item;
  }

  async updateOne(id, atributes) {
    return await this.database(this.table).where({ id }).update(atributes);
  }

  async removeOne(id) {
    return await this.database(this.table).where({ id }).del();
  }
}

module.exports = SQLDatabase;
