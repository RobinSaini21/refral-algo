const { Users } = require("./../schemas")

module.exports = async function loginController(req , res) {
    const users = await Users.find();
    return res.json(users);
}


