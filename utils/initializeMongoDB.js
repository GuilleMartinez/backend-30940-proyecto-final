module.exports = ({ connection }) => {
    
  const mongoose = require("mongoose");

  const DaoMongoProducts = require("../daos/products/DaoMongoProducts");
  const DaoMongoCart = require("../daos/carts/DaoMongoCarts");

  mongoose.connect(connection);

  mongoose.connection.on("connected", () => console.log("MongoDB connected ✔"));

  mongoose.connection.on("error", (err) => {
    console.log(`Error connecting MongoDB: ${err.message}. The server is shutting down.`);
    process.exit(1);
  });

  return {
    products: new DaoMongoProducts(require("../models/mongodb/products")),
    carts: new DaoMongoCart(require("../models/mongodb/cart")),
  };
  
};
