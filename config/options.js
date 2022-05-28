const options = {
  admin: true,
  port: process.env.PORT || 8080,
  databases: {
    selected: 1,
    collections: {
      products: "products",
      carts: "carts",
    },
    types: {
      1: { type: "File System", config: {} },
      2: {
        type: "MariaDB",
        config: {
          client: "mysql",
          connection: {
            host: "localhost",
            port: 3306,
            user: "root",
            database: "ecommerce",
          },
          pool: { min: 0, max: 7 },
        },
      },
      3: {
        type: "SQLite3",
        config: {
          client: "sqlite3",
          connection: {
            filename: "./db/ecommerce",
          },
          pool: { min: 0, max: 7 },
          useNullAsDefault: true,
        },
      },
      4: {
        type: "MongoDB",
        config: {
          connection: "mongodb://localhost:27017/ecommerce",
        },
      },
      5: {
        type: "Firestore",
        config: {
          credential: require("../config/firebase.config.json"),
        }
      }
    },
  },
};

module.exports = options;
