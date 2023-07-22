require('dotenv').config();
const mongoose = require('mongoose');



async function connectDatabase() {
    try {
        mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log("Error connecting to Mongo",error)
    }
}

connectDatabase();