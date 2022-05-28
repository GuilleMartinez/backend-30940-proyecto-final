module.exports = (config, { products, carts }) => {
  const DaoSqlProducts = require("../daos/products/DaoSqlProducts");
  const DaoSqlCarts = require("../daos/carts/DaoSqlCarts");

  return {
    products: new DaoSqlProducts(config, products, require("../models/sql/products")),
    carts: new DaoSqlCarts(config, carts, require("../models/sql/cart")),
  };

};
