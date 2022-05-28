module.exports = ({ credential }, { products, carts }) => {
  const firebase = require("firebase-admin");
  const DaoFirestoreProducts = require("../daos/products/DaoFirestoreProducts");
  const DaoFirestoreCarts = require("../daos/carts/DaoFirestoreCart");
  const app = firebase.initializeApp({ credential: firebase.credential.cert(credential) })
  const firestore = app.firestore();

  return {
    products: new DaoFirestoreProducts(firestore, products),
    carts: new DaoFirestoreCarts(firestore, carts),
  };
};
