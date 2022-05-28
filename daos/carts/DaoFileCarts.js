const JsonDatabase = require("../../lib/JsonDatabase");
const Cart = require("../../lib/Cart");

class DaoFlieCart extends JsonDatabase {

  constructor(fileName) {
    super(fileName);
  }

  #searchProductInCart(productId, items) {
    const index = items.findIndex((product) => product.id == productId);
    return { productIndex: index, item: items[index] || null };
  }

  #createCart() {
    const cart = new Cart();
    return {
      id: new Date().getTime().toString(),
      ...cart
    };
  }

  async #searchCart(id) {
    const carts = await this.get();
    const index = carts.findIndex((cart) => cart.id == id);
    return { index, cart: carts[index] || null };
  }

  async get() {
    const { carts = [] } = await this.read();
    return carts;
  }

  async insertOne() {
    const carts = await this.get();
    const cart = this.#createCart();
    carts.push(cart);
    await this.save({ carts });
    return cart;
  }

  async findOne(id) {
    const { cart } = await this.#searchCart(id);
    return cart;
  }

  async removeOne(id) {
    const { index, cart } = await this.#searchCart(id);
    if (cart) {
      const carts = await this.get();
      carts.splice(index, 1);
      return await this.save({ carts });
    }
    return null;
  }

  async insertInto(cartID, product) {
    const { index, cart } = await this.#searchCart(cartID);
    if (cart) {
      const { item } = this.#searchProductInCart(product.id, cart.items)
      if (!item) {
        const carts = await this.get();
        cart.items.push(product);
        carts.splice(index, 1, cart);
        return await this.save({ carts });
      }
      return cart;
    }
    return null;
  }

  async removeFrom(cartId, productId) {
    const { index, cart } = await this.#searchCart(cartId);
    if (cart) {
      const { productIndex, item } = this.#searchProductInCart(productId, cart.items);
      if (item) {
        const carts = await this.get();
        cart.items.splice(productIndex, 1);
        carts.splice(index, 1, cart);
        return await this.save({ carts });
      }
      return null;
    }
    return null;
  }
}

module.exports = DaoFlieCart;
