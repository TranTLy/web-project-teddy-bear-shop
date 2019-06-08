var express = require("express");
var router = express.Router();

var dashboard_controller = require("../controllers/dashboardController");
var users_controller = require("../controllers/usersController");
var products_controller = require("../controllers/productsController");
var bills_controller = require("../controllers/billsController");
var types_controller = require("../controllers/typesController");
var producers_controller = require("../controllers/producersController");
var origins_controller = require("../controllers/originsController");
var detail_controller = require("../controllers/detailController");
var account_controller = require('../controllers/accountController');

router.get("/", dashboard_controller.index);

router.get("/dashboard", dashboard_controller.index);
router.post("/dashboard", dashboard_controller.statistical);

router.get("/users", users_controller.index);
router.get("/users/getUser", users_controller.getUsers);

router.get("/products", products_controller.index);
router.get("/products/get", products_controller.get);
router.post("/products", products_controller.create);
router.delete("/products/:_id", products_controller.delete);
router.put("/products/:_id", products_controller.update);

router.get("/types", types_controller.index);
router.get("/types/get", types_controller.get);
router.post("/types", types_controller.create);
router.delete("/types/:_id", types_controller.delete);
router.put("/types/:_id", types_controller.update);

router.get("/origins", origins_controller.index);
router.get("/origins/get", origins_controller.get);
router.post("/origins", origins_controller.create);
router.delete("/origins/:_id", origins_controller.delete);
router.put("/origins/:_id", origins_controller.update);

router.get("/producers", producers_controller.index);
router.get("/producers/get", producers_controller.get);
router.post("/producers", producers_controller.create);
router.delete("/producers/:_id", producers_controller.delete);
router.put("/producers/:_id", producers_controller.update);

router.get("/bills", bills_controller.get);
router.get("/bills/getlistproducts", bills_controller.getProductsByIdBill);
// router.post("/bills", bills_controller.search_sort);

// router.get("/register", function(req, res) {
//   res.render("pages/register/index", { title: "Đăng ký" });
// });

// router.get("/login", function(req, res) {
//   res.render("pages/login/index", { title: "Đăng nhập" });
// });

router.post('/login', account_controller.post_signin);
router.get('/login', account_controller.signin);
router.get('/register', account_controller.signup);
router.post('/register', account_controller.post_signup);
// router.post('/signin', account_controller.signup);
router.get('/forget-password', account_controller.forget_password);
router.get('/change-password', account_controller.change_password);
router.get('/update-infor', account_controller.update_infor);


router.get("/detail", detail_controller.get);
module.exports = router;
