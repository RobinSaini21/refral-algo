const { Users } = require("./../schemas");
const { ObjectId } = require("mongodb");
const { registerValidation } = require("../validators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { calulateBouns } = require("../util");

let val = 0;
const secretKey = "your_secret_key_here";

module.exports = registerController = async (req, res, next) => {
  const user = req.body;

  try {
    // Validate user input
    const validation = registerValidation(user);
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    // Check if user already exists
    const exists = await Users.findOne({ email: user.email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    const referralCode = (await import("referral-codes")).generate({
      length: 8,
      count: 5,
    })[0];

    const savedUser = await Users.create({
      ...user,
      password: hash,
      referral_code: referralCode,
    });

    if (user?.referral_code) {
      const referral = await Users.findOne({
        referral_code: user.referral_code,
      });
      if (referral) {
        await Users.updateOne(
          { _id: referral._id },
          {
            $set: {
              referralBonus:
                referral.referralBonus +
                calulateBouns(referral.referral_remaining),
              referral_remaining:
                referral.referral_remaining - 1 < 1
                  ? 1
                  : referral.referral_remaining - 1,
            },
            $push: { children_user: savedUser._id },
          }
        );
        await Users.updateOne(
          { _id: savedUser._id },
          { $set: { parent_user: referral._id } }
        );
      }
    }

    const token = jwt.sign(
      {
        email: savedUser.email,
        username: savedUser.username,
        referral_code: savedUser.referral_code,
      },
      secretKey
    );

    // Send response
    return res.status(200).send({
      name: savedUser.username,
      email: savedUser.email,
      referral_code: savedUser.referral_code,
      token,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
