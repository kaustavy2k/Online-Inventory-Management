const express = require("express");
const reportsController = require("../controllers/reportsController");
const authController = require("../controllers/authController");
const userContoller = require("../controllers/userController");
const collegeitemsController = require("../controllers/collegeitemsController");
const transactionitemsController = require("../controllers/transactionitemsController");
const inventoryitemsController = require("../controllers/inventoryitemsController");

const router = express.Router();


router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/signup").post(authController.signup);

router
  .route("/addcollegeitems")
  .post(authController.protect, collegeitemsController.additems);
router
  .route("/deletecollegeitems/:id")
  .get(authController.protect, collegeitemsController.deleteitems);
router
  .route("/showcollegeitems")
  .get(authController.protect, collegeitemsController.showitems);
router
  .route("/updatecollegeitems")
  .post(authController.protect, collegeitemsController.updateitems);

  router
  .route("/addinventoryitems")
  .post(authController.protect, inventoryitemsController.additems);
router
  .route("/deleteinventoryitems/:id")
  .get(authController.protect, inventoryitemsController.deleteitems);
router
  .route("/showinventoryitems")
  .get(authController.protect, inventoryitemsController.showitems);
router
  .route("/updateinventoryitems")
  .post(authController.protect, inventoryitemsController.updateitems);


router
  .route("/addtransactionitems")
  .post(authController.protect, transactionitemsController.additems);
router
  .route("/deletetransactionitems/:id")
  .get(authController.protect, transactionitemsController.deleteitems);
router
  .route("/showtransactionitems")
  .get(authController.protect, transactionitemsController.showitems);
router
  .route("/updatetransactionitems")
  .post(authController.protect, transactionitemsController.updateitems);
router
  .route("/paytransactionitems")
  .post(authController.protect, transactionitemsController.payment);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);

router.route("/showusers").get(authController.protect, userContoller.showitems);
router
  .route("/deleteuser")
  .post(authController.protect, userContoller.deleteuser);
router
  .route("/updateuser")
  .post(authController.protect, userContoller.updateuser);

router
  .route("/showreports")
  .get(authController.protect, reportsController.showitems);
router
  .route("/updatereports")
  .post(authController.protect, reportsController.updateitems);
router
  .route("/deletereports/:id")
  .get(authController.protect, reportsController.deleteitems);
router
  .route("/addreports")
  .post(authController.protect, reportsController.additems);

module.exports = router;
