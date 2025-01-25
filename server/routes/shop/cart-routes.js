const exress = require("express");
const {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
} = require("../../contollers/shop/cart-controller");

const router = exress.Router();
router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);
module.exports = router;
