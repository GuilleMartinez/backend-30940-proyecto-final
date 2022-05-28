module.exports = ({ products, carts }) => {
  const DaoFileProducts = require("../daos/products/DaoFileProducts");
  const DaoFileCarts = require("../daos/carts/DaoFileCarts");
  return {
    products: new DaoFileProducts(products),
    carts: new DaoFileCarts(carts),
  };
};
