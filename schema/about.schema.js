const mongoose = require('mongoose');
const aboutSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required : true,
    },
    title:{
        type: String,
        required:true,
    },
    headLine:{
        type: String,
        required:true,
    },
    bio:{
        type: String,
        required:true,
    },
    avatarUrl:{
        type: String,
    },
    resumeUrl:{type: String},
    location:{
        type: String,
    },
    yearsOfExperience: { type: Number, default: 1 },
    socialLinks:[{
        platform: {
            type: String, 
            required: true
        },
        url:{
            type: String, 
            required: true
        },
        icon:{
            type: String
        }
    }]
},{timestamps: true});

const AboutSchema = mongoose.model("about", aboutSchema);
module.exports = AboutSchema;