const express = require("express");
const UserSchema = require("../schema/user.schema.js");
const router = express.Router();

router.get('/', async(req, res)=>{
  try{
    const User = await UserSchema.findOne();
    if(!User){
      res.status(404).json({ message: "there is no user with this data", User});

    }
    res.status(200).json({ message: "user founded successfully!", User});

  }catch(error){
    console.error("error finding user information.", error);
    res.status(500).json({ message: "Error finding user information." });
  }
});




module.exports = router;

