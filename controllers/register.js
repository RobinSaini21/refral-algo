const { Users } = require("./../schemas");
const { registerValidation } = require("../validators");

module.exports = registerController = async (req, res, next) => {
    const user = req.body;
     const validation = registerValidation(user);
     const exists = await Users.findOne({ email: user.email });
     if (!exists) {
       if (validation.error) {
         return res.status(500).json({ err: validation.error });
       } else {
         hashPassword(user.password)
           .then((hash) => {
             Users({ ...user, password: hash })
               .save()
               .then((savedUser) => {
                 const token = jwtSign({ ...savedUser, id: savedUser._id });
                 return res
                   .status(200)
                   .send({ name: savedUser.name, email: savedUser.email, token });
               });
           })
           .catch((err) => {
             return res.status(500).send({ messages: "server error" });
           });
       }
     } else {
       return res.status(500).send({ messages: "User Already Exists" });
     }
   };