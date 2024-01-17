const express = require("express");
const auth = require("../middlewares/auth");
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

router.get("/user", auth(), userController.index);
router.post("/profile/update", auth(), userController.update);
router.post("/profile/password", auth(), userController.passwordUpdate);

router.get("/bets", auth(), betController.index);
router.post("/bets/stake", auth(), betController.store);

router.get("/my-bets", auth(), userBetController);

router.get("/payment-methods", auth(), paymentMethodController);

router.get("/transactions", auth(), transactionController);
router.post("/deposit", auth(), depositController);
router.post("/withdraw", auth(), withdrawalController);

router.post("/support", auth(), supportController);

// Not Auth routes in Api's routes
router.get("/faqs", faqController);
router.get("/pages/:slug", pageController);

module.exports = router;
