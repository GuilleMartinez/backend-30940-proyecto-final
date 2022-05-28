const model = (table) => {
      table.increments("id").primary();
      table.timestamp("timestamp");
      table.string("items");
}

module.exports = model;