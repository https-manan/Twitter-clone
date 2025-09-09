const mongoose = require('mongoose');


const dbConnection =async ()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DB`)
}

module.exports = dbConnection