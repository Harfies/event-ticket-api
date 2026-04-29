const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

// initialize payment
router.post("/initialize", paymentController.initializePayment);

// verify payment
//router.post("/verify", paymentController.verifyPayment);

router.post("/webhook", paymentController.handleWebhook);

// export router (VERY IMPORTANT)
module.exports = router;
