const FirestoreDatabase = require("../../lib/FirestoreDatabase");
const Cart = require("../../lib/Cart");

class DaoFirestoreCarts extends FirestoreDatabase {

  constructor(firestore, collection) {
    super(firestore, collection);
  }

  #createCart() {
    return new Cart();
  }

  #findProductInCart(productId, cartItems) {
    const index = cartItems.findIndex((product) => product.id == productId);
    return { index, item: cartItems[index] || null };
  }

  async insertOne() {
    const cart = this.#createCart();
    return this.collection.add({ ...cart });
  }

  async updateOne() {
    return null;
  }

  async insertInto(cartId, product) {
    const cart = await this.findOne(cartId);
    if (cart) {
      const { item } = this.#findProductInCart(product.id, cart.items);
      if (!item) {
        cart.items.push(product);
        await this.collection.doc(cartId).update({ items: cart.items });
      }
      return cart;
    }
    return null;
  }

  async removeFrom(cartId, productId) {
    const cart = await this.findOne(cartId);
    if (cart) {
      const { index, item } = this.#findProductInCart(productId, cart.items);
      if (item) {
        cart.items.splice(index, 1);
        return await this.collection.doc(cartId).update({ items: cart.items });
      }
      return null;
    }
    return null;
  }
}

module.exports = DaoFirestoreCarts;
