const { Router } = require("express");
const {
    getAllProducts,
    addProduct,
    findProductById,
    findProductByIdAndRemove,
    findProductByIdAndUpdate,
} = require("../controllers/products");

const auth = require("../utils/authorization");

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", findProductById);

router.post("/", auth, addProduct);
router.put("/:id", auth, findProductByIdAndUpdate);
router.delete("/:id", auth, findProductByIdAndRemove);

module.exports = router;
