const exress = require("express");

const {
    getAllOrdersOfAllUsers,
 getOrderDetailsForAdmin,updateOrderStatus
} = require("../../contollers/admin/order-controller");

const router = exress.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
