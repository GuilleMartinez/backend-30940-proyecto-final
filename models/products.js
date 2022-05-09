const JsonDatabase = require("../lib/JsonDatabase");

class Products extends JsonDatabase {
    constructor(fileName) {
        super(fileName);
    }

    async get() {
        const { products = [] } = await this.read();
        return products;
    }

    async insertOne(data) {
        const products = await this.get();
        const date = new Date();
        const product = {
            id: date.getTime().toString(),
            timestamp: date.toISOString(),
            ...data,
        };
        products.push(product);
        await this.save({ products });
        return product;
    }

    async findOne(id) {
        const products = await this.get();
        const index = products.findIndex((product) => product.id == id);
        return { index, product: products[index] || null };
    }

    async updateOne(id, attributes) {
        const { index, product } = await this.findOne(id);
        if (product) {
            const products = await this.get();
            products.splice(index, 1, { id, ...attributes });
            await this.save({ products });
            return products[index];
        }
        return null;
    }

    async removeOne(id) {
        const { index, product } = await this.findOne(id);
        if (product) {
            const products = await this.get();
            products.splice(index, 1);
            await this.save({ products });
            return product;
        }
        return null;
    }
}

module.exports = new Products("products");
