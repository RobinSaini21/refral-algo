const { Users } = require("./../schemas")

module.exports = async function loginController(req , res) {
    const users = await Users.find({}, {password: 0});
    return res.json(users);
}


