const { Schema, model } = require("mongoose");
const { databases: { collections: { carts } } } = require("../../config/options");

const schema = new Schema({
  timestamp: { type: Date, required: true },
  items: [
    {
      _id: { type: String, required: true },
      name: { type: String, require: true },
      description: { type: String, required: true },
      photo: { type: String, required: true },
      code: { type: String, required: true },
      stock: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
}, { versionKey: false });

module.exports = model(carts, schema);
