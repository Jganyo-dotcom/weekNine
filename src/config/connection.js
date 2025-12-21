const mongoose = require("mongoose")

const database = async ()=>{
    try{
           await mongoose.connect(process.env.MONGO_URL)
            console.log("Database connected")

    }catch(error){
        console.error(error)
    }

}

module.exports = database