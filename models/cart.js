const JsonDatabase = require("../lib/JsonDatabase");
const products = require("../models/products");

class Cart extends JsonDatabase {
    constructor(fileName) {
        super(fileName);
    }

    async get() {
        const { carts = [] } = await this.read();
        return carts;
    }

    async insertOne() {
        const carts = await this.get();
        const date = new Date();
        const cart = {
            id: date.getTime().toString(),
            timestamp: date.toISOString(),
            items: [],
        };
        carts.push(cart);
        await this.save({ carts });
        return cart;
    }

    async findOne(id) {
        const carts = await this.get();
        const index = carts.findIndex((cart) => cart.id == id);
        return { index, cart: carts[index] || null };
    }

    async removeOne(id) {
        const { index, cart } = await this.findOne(id);
        if (cart) {
            const carts = await this.get();
            carts.splice(index, 1);
            await this.save({ carts });
            return cart;
        }
        return null;
    }

    async insertInto(cartID, productID) {
        const { index, cart } = await this.findOne(cartID);
        const { product } = await products.findOne(productID);
        if (cart && product) {
            const carts = await this.get();
            const { exists } = this.#searchProductInCart(cart, productID);
            if (!exists) {
                cart.items.push(product);
                carts.splice(index, 1, cart);
                await this.save({ carts });
            }
            return cart;
        }
        return null;
    }

    async removeFrom(cartID, productID) {
        const { index, cart } = await this.findOne(cartID);
        const { productIndex, exists } = this.#searchProductInCart(cart, productID);
        if (cart && exists) {
            const carts = await this.get();
            cart.items.splice(productIndex, 1);
            carts.splice(index, 1, cart);
            await this.save({ carts });
            return cart;
        }
        return null;
    }

    #searchProductInCart(cart, productID) {
        const index = cart.items.findIndex((product) => product.id == productID);
        return { productIndex: index, exists: index >= 0 };
    }
}

module.exports = new Cart("cart");
