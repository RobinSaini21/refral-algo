const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://robinsaini2126:MLcB98hSZmTIQTWS@cluster0.x83bzir.mongodb.net/referrals?retryWrites=true&w=majority";
//MLcB98hSZmTIQTWS




const db = mongoose.connect(dbUrl).then(() =>{
    console.log("CONNECTED TO DB")
}).catch((err) =>{
    console.log(err)
})



module.exports = db;