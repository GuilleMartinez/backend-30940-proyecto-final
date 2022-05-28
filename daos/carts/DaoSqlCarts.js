const SQLDatabase = require("../../lib/SQLDatabase");
const Cart = require("../../lib/Cart");

class SQLCart extends SQLDatabase {

  constructor(config, table, model) {
    super(config, table, model);
  }

  #parseCart(cart) {
    return {...cart, items: JSON.parse(cart.items), };
  }

  #createCart() {
    const cart = new Cart();
    return { ...cart, items: JSON.stringify(cart.items) };
  }

  #searchProductInCart(productId, items) {
    const index = items.findIndex((product) => product.id == productId);
    return { productIndex: index, item: items[index] || null };
  }

  async get() {
    const carts = await this.database(this.table).select();
    return carts.map(this.#parseCart);
  }

  async insertOne() {
    const cart = this.#createCart();
    const [id] = await this.database(this.table).insert(cart);
    return { id };
  }

  async findOne(id) {
    const [cart] = await this.database(this.table).where({ id }).select();
    return cart ? this.#parseCart(cart) : null;
  }

  async updateOne() {
    return null;
  }

  async insertInto(cartId, product) {
    const cart = await this.findOne(cartId);
    if (cart) {
      const { item } = this.#searchProductInCart(product.id, cart.items);
      if (!item) {
        cart.items.push(product);
        await this.database(this.table)
          .where({ id: cartId })
          .update({ items: JSON.stringify(cart.items) });
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
        return await this.database(this.table)
          .where({ id: cartId })
          .update({ items: JSON.stringify(cart.items) });
      }
      return null;
    }
    return null;
  }
}

module.exports = SQLCart;
