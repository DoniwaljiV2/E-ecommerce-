const exress = require("express");
const {
    searchProducts
} = require("../../contollers/shop/search-controller");


const router=exress.Router();
router.get('/:keyword',searchProducts);

module.exports = router;