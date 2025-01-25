const exress = require("express");
const {
  addProductReview,getProductReviews
} = require("../../contollers/shop/product-review-controller");


const router=exress.Router();
router.post('/add',addProductReview);
router.get('/:productId',getProductReviews);
module.exports = router;