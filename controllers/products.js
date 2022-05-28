const { products } = require("../daos/daoSelector");
const validateProduct = require("../utils/validateProduct");

const getAllProducts = async (req, res, next) => {
    return res.json({ products: await products.get() });
};

const addProduct = async (req, res, next) => {
    const isValid = validateProduct(req.body);
    if (isValid) {
        const added = await products.insertOne(req.body);
        return res.status(201).json({ added });
    }
    return next({ type: "bad_request" });
};

const findProductById = async (req, res, next) => {
    const { id } = req.params;
    const product = await products.findOne(id);
    return product ? res.json({ product }) : next({ type: "not_found" });
};

const findProductByIdAndRemove = async (req, res, next) => {
    const { id } = req.params;
    const deleted = await products.removeOne(id);
    return deleted ? res.sendStatus(204) : next({ type: "not_found" });
};

const findProductByIdAndUpdate = async (req, res, next) => {
    const { id } = req.params;
    const isValid = validateProduct(req.body);
    if (isValid) {
        const edited = await products.updateOne(id, req.body);
        return edited ? res.sendStatus(204) : next({ type: "not_found" });
    }
    return next({ type: "bad_request" });
};

module.exports = {
    getAllProducts,
    addProduct,
    findProductById,
    findProductByIdAndRemove,
    findProductByIdAndUpdate,
};
