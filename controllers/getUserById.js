const { Users } = require("./../schemas");

module.exports = async function getUserById(req, res) {
  try {
    const user = req.user;
    const id = req?.params?.id;

    if(!!!id) {
        return res.status(409).json({ message: "Id is not included" });
    }
    const foundUser = await Users.findOne({ email: user.email });
    if (foundUser && foundUser.is_admin) {
      const users = await Users.findById({_id: id}, { password: 0 });
      if(users){
        return res.json(users);
      } else {
        return res.status(409).json({ message: "User not found" });
      }
    
    } else {
      return res.status(409).json({ message: "Invalid Request" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};