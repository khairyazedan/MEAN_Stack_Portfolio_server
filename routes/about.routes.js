const express = require("express");
const router = express.Router();
const AboutSchema = require("../schema/about.schema.js");
const upload = require('../middlewares/uploads.middleware.js');
const fs = require("fs");
const path = require("path");


router.get('/', async(req, res)=>{
  try{
    const allabouts = await AboutSchema.find().sort('-createdAt');
    res.status(200).json({ message: "all About founded successfully!", allabouts });

  }catch(error){
    console.error("error adding About", error);
    res.status(500).json({ message: "Error finding all About" });
  }
})

// create about
router.post("/", upload.single("avatarUrl"), async (req, res) => {
  const { fullName, title, headLine, bio, resumeUrl, location, yearsOfExperience } = req.body;
  const avatarUrl = req.file ? "http://localhost:3000/files/" + req.file.filename : "";
 
  let socialLinks = [];
  try {
    if (req.body.socialLinks) socialLinks = JSON.parse(req.body.socialLinks);
  } catch {
    return res.status(400).json({ message: "socialLinks must be valid JSON" });
  }

  try {
    const about = await AboutSchema.create({
      fullName, title, headLine, bio, avatarUrl,
      resumeUrl, location, yearsOfExperience, socialLinks,
    });
    res.status(201).json({ message: "About added successfully!", about });
  } catch (error) {
    console.error("error adding About", error);
    
    res.status(500).json({ message: "Error adding About" });
  }
});

// get about by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const about = await AboutSchema.findById(id);

    res.status(200).json({ message: "About founded successfully!", about });
  } catch (error) {
    console.error("error founding About", error);
    res.status(500).json({ message: "Error founding About" });
  }
});

//   update about

router.put("/:id", upload.single("avatarUrl"), async (req, res) => {

  const id = req.params.id;

  
  const fields = ["fullName", "title", "headLine", "bio", "resumeUrl", "location", "yearsOfExperience"];
  const updates = {};
  for (const f of fields) {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  }

  
  if (req.body.socialLinks !== undefined) {
    try {
      updates.socialLinks = JSON.parse(req.body.socialLinks);
    } catch {
      return res.status(400).json({ message: "socialLinks must be valid JSON" });
    }
  }
  if (req.file) {
    updates.avatarUrl = `/uploads/${req.file.filename}`;
  } else if (req.body.avatarUrl !== undefined) {
    updates.avatarUrl = req.body.avatarUrl;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  try {
    const old = await AboutSchema.findById(id);
    if (!old) {
      return res.status(404).json({ message: "About not found" });
    }

    const about = await AboutSchema.findByIdAndUpdate(
      id,
      { $set: updates },
      { returnDocument: "after", runValidators: true },
    );

    // delete the old image file from disk (only if a new one replaced it)
    if (req.file && old.avatarUrl) {
      fs.unlink(path.join("uploads", path.basename(old.avatarUrl)), () => {});
    }

    res.status(200).json({ message: "About updated successfully!", about });
  } catch (error) {
    console.error("error updating About", error);
    res.status(500).json({ message: "Error updating About" });
  }
});

// delete about
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const about = await AboutSchema.findByIdAndDelete(
        id
      );
      if (!about) {
        return res.status(404).json({ message: "About not found" });
      }
  
      res.status(200).json({ message: "About deleted successfully!", about });
    } catch (error) {
      console.error("error updating About", error);
      res.status(500).json({ message: "Error deleted About" });
    }
  });
  
module.exports = router;
