const { Users } = require("./../schemas");

module.exports = async function getUserById(req, res) {
  try {
    const user = req.user;
    console.log(req.params.id)
    const id = req?.params?.id;

    if(!!!id) {
        return res.status(409).json({ message: "Id is not included" });
    }
    const foundUser = await Users.findOne({ email: user.email });
    if (foundUser) {
      const users = await Users.findById({_id: id}, { password: 0 });
      return res.json(users);
    } else {
      return res.status(409).json({ message: "Invalid Request" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};