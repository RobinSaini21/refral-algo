const { Users } = require("./../schemas");
const { registerValidation } = require("../validators");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


let val = 0
const secretKey = 'your_secret_key_here';

module.exports = registerController = async (req, res, next) => {
  console.log(req.body)
  const user = {
    username: "john_doe",
    email: `john${val++}@example.com`,
    referralBonus: 10,
    referral_code: (await import("referral-codes")).generate({
      length: 8,
      count: 5,
    })[0],
    parent_user: null, // Assuming no parent user for this user
    children_user: [], // Assuming no children users for this user
    password: "password123",
  }
   // const user = req.body;
     const validation = registerValidation(user);
     const exists = await Users.findOne({ email: user.email });
     if (!exists) {
       if (validation.error) {
         return res.status(500).json({ err: validation.error });
       } else {
           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(user.password, salt);
             Users({ ...user, password: hash })
               .save()
               .then((savedUser) => {
                const token = jwt.sign({email: user.email , username: user.username }, secretKey);
                 return res
                   .status(200)
                   .send({ name: savedUser.username
                    
                    , email: savedUser.email, token });
               });
          
       }
     } else {
       return res.status(500).send({ messages: "User Already Exists" });
     }
   };

// module.exports = registerController = async (req, res, next) => {
//   const user = req.body;
//   const newUser = new Users({
//     username: "john_doe",
//     email: "john@example.com",
//     referralBonus: 10,
//     referral_code: (await import("referral-codes")).generate({
//       length: 8,
//       count: 5,
//     })[0],
//     parent_user: null, // Assuming no parent user for this user
//     children_user: [], // Assuming no children users for this user
//     password: "password123",
//   });
//   newUser
//     .save()
//     .then((savedUser) => {
//       console.log("User saved successfully:", savedUser);
//     })
//     .catch((error) => {
//       console.error("Error saving user:", error);
//     });

//   return res
//     .status(200)
//     .send({ name: newUser.username, email: newUser.email });
// };
