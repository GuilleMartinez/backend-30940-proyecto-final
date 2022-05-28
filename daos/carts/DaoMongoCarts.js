const MongoDatabase = require("../../lib/MongoDatabase");
const Cart = require("../../lib/Cart");

class DaoMongoCart extends MongoDatabase {

  constructor(model) {
    super(model);
  }

  #searchProductInCart(productId, items) {
    const index = items.findIndex((product) => product.id == productId);
    return { productIndex: index, item: items[index] || null };
  }

  #createCart() {
    return new Cart();
  }

  async insertOne() {
    return await this.model.create(this.#createCart());  
  }

  async updateOne() {
    return null;
  }

  async removeOne(id) {
    return await this.model.findByIdAndRemove(id);
  }

  async insertInto(cartID, product) {
    const cart = await this.findOne(cartID);
    if (cart) {
      const { item } = this.#searchProductInCart(product.id, cart.items);
      if (!item) {
        cart.items.push(product);
        await this.model.findByIdAndUpdate(cartID, { items: cart.items });
      }
      return cart;
    }
    return null;
  }

  async removeFrom(cartId, productId) {
    const cart = await this.findOne(cartId);
    if (cart) {
      const { index, item } = this.#searchProductInCart(productId, cart.items);
      if (item) {
        cart.items.splice(index, 1);
        return await this.model.findByIdAndUpdate(cartId, { items: cart.items });
      }
      return null;
    }
    return null;
  }
}

module.exports = DaoMongoCart;
