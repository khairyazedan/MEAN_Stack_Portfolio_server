const mongoose = require('mongoose');
const dbString = process.env.CONNECTION_STRING;


const connectToDatabase = () => mongoose.connect(dbString)
.then(()=>{
    console.log("Database is connected Successfully!");
    
}).catch((error)=>{
    console.log(`error while connecting to database ${error}`);
    
});
module.exports = connectToDatabase;