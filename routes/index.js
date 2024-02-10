var express = require('express');
var router = express.Router();
const { loginController , registerController, getAllUsers } = require("../controllers")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/get-all-users", getAllUsers);

module.exports = router;
