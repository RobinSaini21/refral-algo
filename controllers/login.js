const { Users } = require("./../schemas");
const { loginValidation } = require("../validators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { calulateBouns } = require("../util");

const secretKey = "your_secret_key_here";

module.exports = registerController = async (req, res, next) => {
  const user = req.body;

  try {
    // Validate user input
    const validation = loginValidation(user);
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    // Check if user already exists
    const foundUser = await Users.findOne({ email: user.email });
    if (!user) {
      return res.status(409).json({ message: "User dosent exists" });
    }

    const isSame = await bcrypt.compare(user.password, foundUser.password);

    if (!isSame) {
      return res.status(409).json({ message: "Password not matching" });
    }

    const token = jwt.sign(
      {
        email: foundUser.email,
        username: foundUser.username,
        referral_code: foundUser.referral_code,
      },
      secretKey
    );
    // Send response
    return res.status(200).send({
      name: foundUser.username,
      email: foundUser.email,
      token,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
