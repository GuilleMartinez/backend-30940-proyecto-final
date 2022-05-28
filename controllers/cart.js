const { products, carts } = require("../daos/daoSelector");

const createNewCart = async (req, res, next) => {
    const { id } = await carts.insertOne();
    res.status(201).json({ cart: id });
};

const findCartByIdAndGetProducts = async (req, res, next) => {
    const { id } = req.params;
    const cart = await carts.findOne(id);
    return cart ? res.json({ products: cart.items }) : next({ type: "not_found" });
};

const findCartByIdAndRemove = async (req, res, next) => {
    const { id } = req.params;
    const deleted = await carts.removeOne(id);
    return deleted ? res.sendStatus(204) : next({ type: "not_found" });
};

const addProductIntoCart = async (req, res, next) => {
    const { id, productID } = req.params;
    const product = await products.findOne(productID);
    const added = product ? await carts.insertInto(id, product) : null;
    return added ? res.sendStatus(204) : next({ type: "not_found" });
};

const removeProductFromCart = async (req, res, next) => {
    const { id, productID } = req.params;
    const deleted = await carts.removeFrom(id, productID);
    return deleted ? res.sendStatus(204) : next({ type: "not_found" });
};

module.exports = {
    createNewCart,
    findCartByIdAndGetProducts,
    findCartByIdAndRemove,
    addProductIntoCart,
    removeProductFromCart,
};
