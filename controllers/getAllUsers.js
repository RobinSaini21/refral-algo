const { Users } = require("./../schemas");

module.exports = async function getAllUsers(req, res) {
  try {
    const user = req.user;
    const foundUser = await Users.findOne({ email: user.email });
    if (foundUser && foundUser.is_admin) {
      const users = await Users.find({}, { password: 0 });
      return res.json(users);
    } else {
      return res.status(409).json({ message: "Invalid Request" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
