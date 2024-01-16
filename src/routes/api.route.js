const express = require("express");
const userController = require("../controllers/user.controller");
const betController = require("../controllers/bet.controller");
const userBetController = require("../controllers/userbet.controller");
const paymentMethodController = require("../controllers/paymentmethod.controller");
const transactionController = require("../controllers/transaction.controller");
const depositController = require("../controllers/deposit.controller");
const withdrawalController = require("../controllers/withdrawal.controller");
const supportController = require("../controllers/support.controller");
const faqController = require("../controllers/faq.controller");
const pageController = require("../controllers/page.controller");

const router = express.Router();

router.get("api/user", userController.index);
router.post("api/profile/update", userController.update);
router.post("api/profile/password", userController.passwordUpdate);

router.get("api/bets", betController.index);
router.post("api/bets/stake", betController.store);

router.get("api/my-bets", userBetController);

router.get("api/payment-methods", paymentMethodController);

router.get("api/transactions", transactionController);
router.post("api/deposit", depositController);
router.post("api/withdraw", withdrawalController);

router.post("api/support", supportController);

// Not Auth routes in Api's routes
router.get("api/faqs", faqController);
router.get("api/pages/:slug", pageController);

module.exports = router;
