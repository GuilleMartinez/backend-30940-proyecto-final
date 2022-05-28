const { Schema, model } = require("mongoose");
const { databases: { collections: { products } } } = require("../../config/options");

const schema = new Schema({
    name: { type: String, require: true },
    description: { type: String, required: true  },
    photo: { type: String, required: true },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true }
}, { versionKey: false })

const mod = model(products, schema)

module.exports = mod;