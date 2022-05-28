const model = (table) => {
  table.increments("id").primary();
  table.string("name");
  table.string("code");
  table.string("description");
  table.string("photo");
  table.float("price");
  table.integer("stock");
};

module.exports = model;