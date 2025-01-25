const exress = require("express");
const {
  getFilteredProducts,getProductDetails
} = require("../../contollers/shop/products-controller");


const router=exress.Router();
router.get('/get',getFilteredProducts);
router.get('/get/:id',getProductDetails);
module.exports = router;