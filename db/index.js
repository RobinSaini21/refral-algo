const mongoose = require("mongoose");





const db = mongoose.connect(process.env.MONGODB_ATLAS_URL).then(() =>{
    console.log("CONNECTED TO DB")
}).catch((err) =>{
    console.log(err)
})



module.exports = db;