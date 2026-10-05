const express = require("express");
const router = express.Router();
const SettingsSchema = require("../schema/settings.schema.js");

router.get('/', async(req, res)=>{
  try{
    const allSettings = await SettingsSchema.find().sort('-createdAt');
    res.status(200).json({ message: "all Settings founded successfully!", allSettings });

  }catch(error){
    console.error("error finding all Settings", error);
    res.status(500).json({ message: "Error finding all Settings" });
  }
});


router.post("/", async (req, res) => {
  const {
    siteName,
    siteDescription,
    primaryColor,
    enableBlog,
    enableContactForm,
    seoKeywords,
    googleAnalyticsId,
    themeMode,
  } = req.body;

  try {
    const setting = await SettingsSchema.create({
      siteName,
      siteDescription,
      primaryColor,
      enableBlog,
      enableContactForm,
      seoKeywords,
      googleAnalyticsId,
      themeMode,
    });
    res.status(201).json({ message: "setting added successfully!", setting });
  } catch (error) {
    console.error("error adding setting", error);
    res.status(500).json({ message: "Error adding setting" });
  }
});

// get setting by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const setting = await settingsSchema.findById(id);

    res.status(200).json({ message: "setting founded successfully!", setting });
  } catch (error) {
    console.error("error founding setting", error);
    res.status(500).json({ message: "Error founding setting" });
  }
});

//   update setting
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    siteName,
    siteDescription,
    primaryColor,
    enableBlog,
    enableContactForm,
    seoKeywords,
    googleAnalyticsId,
    themeMode,
  } = req.body;
  try {
    const setting = await SettingsSchema.findByIdAndUpdate(
      id,
      {
        siteName,
        siteDescription,
        primaryColor,
        enableBlog,
        enableContactForm,
        seoKeywords,
        googleAnalyticsId,
        themeMode,
      },
      { returnDocument: "after", runValidators: true },
    );
    if (!setting) {
      return res.status(404).json({ message: "setting not found" });
    }

    res.status(200).json({ message: "setting updated successfully!", setting });
  } catch (error) {
    console.error("error updating setting", error);
    res.status(500).json({ message: "Error updating setting" });
  }
});

// delete setting
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const setting = await SettingsSchema.findByIdAndDelete(id);
    if (!setting) {
      return res.status(404).json({ message: "setting not found" });
    }

    res.status(200).json({ message: "setting deleted successfully!", setting });
  } catch (error) {
    console.error("error updating setting", error);
    res.status(500).json({ message: "Error deleted setting" });
  }
});

module.exports = router;
