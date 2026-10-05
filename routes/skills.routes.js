const express = require("express");
const router = express.Router();
const SkillSchema = require("../schema/skill.schema.js");

router.get('/', async(req, res)=>{
  try{
    const allSkills = await SkillSchema.find().sort('-createdAt');
    res.status(200).json({ message: "all Skills founded successfully!", allSkills});

  }catch(error){
    console.error("error finding all Skills", error);
    res.status(500).json({ message: "Error finding all Skills" });
  }
})

router.post("/", async (req, res) => {
  const { name, category, proficiencyLevel, iconUrl, featured, order } =
    req.body;

  try {
    const skill = await SkillSchema.create({
      name,
      category,
      proficiencyLevel,
      iconUrl,
      featured,
      order,
    });
    res.status(201).json({ message: "skill added successfully!", skill });
  } catch (error) {
    console.error("error adding skill", error);
    res.status(500).json({ message: "Error adding skill" });
  }
});

// get skill by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const skill = await SkillSchema.findById(id);

    res.status(200).json({ message: "skill founded successfully!", skill });
  } catch (error) {
    console.error("error founding skill", error);
    res.status(500).json({ message: "Error founding skill" });
  }
});

//   update skill
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, category, proficiencyLevel, iconUrl, featured, order } =
    req.body;
  try {
    const skill = await SkillSchema.findByIdAndUpdate(
      id,
      {
        name,
        category,
        proficiencyLevel,
        iconUrl,
        featured,
        order,
      },
      { returnDocument: "after", runValidators: true },
    );
    if (!skill) {
      return res.status(404).json({ message: "skill not found" });
    }

    res.status(200).json({ message: "skill updated successfully!", skill });
  } catch (error) {
    console.error("error updating skill", error);
    res.status(500).json({ message: "Error updating skill" });
  }
});

// delete skill
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const skill = await SkillSchema.findByIdAndDelete(id);
    if (!skill) {
      return res.status(404).json({ message: "skill not found" });
    }

    res.status(200).json({ message: "skill deleted successfully!", skill });
  } catch (error) {
    console.error("error updating skill", error);
    res.status(500).json({ message: "Error deleted skill" });
  }
});

module.exports = router;
