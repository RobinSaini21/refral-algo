var express = require('express');
var router = express.Router();
const { loginController , registerController, getAllUsers } = require("../controllers");
const { authMiddleware } = require("./../middleware");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/get-all-users",authMiddleware, getAllUsers);

module.exports = router;
