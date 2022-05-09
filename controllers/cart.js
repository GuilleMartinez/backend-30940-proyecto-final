const model = require("../models/cart");

const createNewCart = async (req, res, next) => {
    const { id } = await model.insertOne();
    res.status(201).json({ cart: id });
};

const findCartByIdAndGetProducts = async (req, res, next) => {
    const { id } = req.params;
    const { cart } = await model.findOne(id);
    return cart ? res.json({ products: cart.items }) : next({ type: "not_found" });
};

const findCartByIdAndRemove = async (req, res, next) => {
    const { id } = req.params;
    const deleted = await model.removeOne(id);
    return deleted ? res.sendStatus(204) : next({ type: "not_found" });
};

const addProductIntoCart = async (req, res, next) => {
    const { id, productID } = req.params;
    const added = await model.insertInto(id, productID);
    return added ? res.sendStatus(204) : next({ type: "not_found" });
};

const removeProductFromCart = async (req, res, next) => {
    const { id, productID } = req.params;
    const deleted = await model.removeFrom(id, productID);
    return deleted ? res.sendStatus(204) : next({ type: "not_found" });
};

module.exports = {
    createNewCart,
    findCartByIdAndGetProducts,
    findCartByIdAndRemove,
    addProductIntoCart,
    removeProductFromCart,
};
