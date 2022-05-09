const { Router } = require("express");
const {
    createNewCart,
    findCartByIdAndGetProducts,
    findCartByIdAndRemove,
    addProductIntoCart,
    removeProductFromCart,
} = require("../controllers/cart");

const router = Router();

router.post("/", createNewCart);
router.delete("/:id", findCartByIdAndRemove);
router.get("/:id/products", findCartByIdAndGetProducts);
router.post("/:id/products/:productID", addProductIntoCart);
router.delete("/:id/products/:productID", removeProductFromCart);

module.exports = router;
