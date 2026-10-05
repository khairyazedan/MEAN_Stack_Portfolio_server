const express = require("express");
const router = express.Router();
const ProjectsSchema = require("../schema/projects.schema.js");
const upload = require('../middlewares/uploads.middleware.js');

// get all projects

router.get('/', async(req, res)=>{
  try{
    const allprojects = await ProjectsSchema.find().sort('-createdAt');
    res.status(200).json({ message: "all Projects founded successfully!", allprojects});

  }catch(error){
    console.error("error finding all Projects", error);
    res.status(500).json({ message: "Error finding all Projects" });
  }
})

// create project
//try the insert many in form to insert more than one project at once!!!!!!
router.post("/",upload.single("coverImage"), async (req, res) => {
  const {
    title,
    slug,
    summary,
    description,
    images,
    liveUrl,
    githubUrl,
    technologies,
    featured,
    order,
    completedAt,
  } = req.body;
  const coverImage = req.file ? "http://localhost:3000/files/" + req.file.filename : "";

  try {
    const project = await ProjectsSchema.create({
      title,
      slug,
      summary,
      description,
      coverImage,
      images,
      liveUrl,
      githubUrl,
      technologies,
      featured,
      order,
      completedAt,
    });
    res.status(201).json({ message: "Project added successfully!", project });
  } catch (error) {
    console.error("error adding Project", error);
    res.status(500).json({ message: "Error adding Project" });
  }
});  

// get project by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const project = await ProjectsSchema.findById(id);

    res.status(200).json({ message: "project founded successfully!", project });
  } catch (error) {
    console.error("error founding project", error);
    res.status(500).json({ message: "Error founding project" });
  }
});

//   update project
router.put("/:id",upload.single("coverImage"), async (req, res) => {
  const id = req.params.id;
  const {
    title,
    slug,
    summary,
    description,
    images,
    liveUrl,
    githubUrl,
    technologies,
    featured,
    order,
    completedAt,
  } = req.body;
  
  if (req.file) coverImage = "http://localhost:3000/files/" + req.file.filename;  
  try {
    const project = await ProjectsSchema.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        summary,
        description,
        coverImage,
        images,
        liveUrl,
        githubUrl,
        technologies,
        featured,
        order,
        completedAt,
      },
      { returnDocument: "after", runValidators: true },
    );
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    res.status(200).json({ message: "project updated successfully!", project });
  } catch (error) {
    console.error("error updating project", error);
    res.status(500).json({ message: "Error updating project" });
  }
});

// delete project
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const project = await ProjectsSchema.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    res.status(200).json({ message: "project deleted successfully!", project });
  } catch (error) {
    console.error("error updating project", error);
    res.status(500).json({ message: "Error deleted project" });
  }
});

module.exports = router;
