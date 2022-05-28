const JsonDatabase = require("../../lib/JsonDatabase");

class DaoFileProducts extends JsonDatabase {
  constructor(fileName) {
    super(fileName);
  }

  #createProduct(data) {
    const date = new Date();
    return {
      id: date.getTime().toString(),
      ...data,
    };
  }

  async #searchProduct(id) {
    const products = await this.get();
    const index = products.findIndex((product) => product.id == id);
    return { index, product: products[index] || null };
  }

  async get() {
    const { products = [] } = await this.read();
    return products;
  }

  async insertOne(data) {
    const products = await this.get();
    const product = this.#createProduct(data);
    products.push(product);
    await this.save({ products });
    return product;
  }
  
  async findOne(id) {
    const { product } = await this.#searchProduct(id);
    return product;
  }

  async updateOne(id, attributes) {
    const { index, product } = await this.#searchProduct(id);
    if (product) {
      const products = await this.get();
      products.splice(index, 1, { id, ...attributes });
      await this.save({ products });
      return products[index];
    }
    return null;
  }

  async removeOne(id) {
    const { index, product } = await this.#searchProduct(id);
    if (product) {
      const products = await this.get();
      products.splice(index, 1);
      await this.save({ products });
      return product;
    }
    return null;
  }
  
}

module.exports = DaoFileProducts;
