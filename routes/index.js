var express = require('express');
var router = express.Router();
const { loginController , registerController, getAllUsers , getUserById } = require("../controllers");
const { authMiddleware } = require("./../middleware");

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: "Hello World" });
});

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/get-all-users",authMiddleware, getAllUsers);
router.get("/get-by-id/:id",authMiddleware, getUserById);

module.exports = router;
