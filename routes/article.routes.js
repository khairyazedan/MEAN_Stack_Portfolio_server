const express = require("express");
const router = express.Router();
const ArticleSchema = require("../schema/article.schema.js");
const upload = require('../middlewares/uploads.middleware.js');

router.get('/', async(req, res)=>{
  try{
    const allarticles = await ArticleSchema.find().sort('-createdAt');
    res.status(200).json({ message: "all Articles founded successfully!", allarticles });

  }catch(error){
    console.error("error finding all Articles", error);
    res.status(500).json({ message: "Error finding all articles" });
  }
})

// create article
//try the insert many in form to insert more than one article at once!!!!!!
router.post("/",upload.single("coverImage"), async (req, res) => {
  const {
    title,
    slug,
    summary,
    content,
    tags,
    status,
    readingTimeMinutes,
    publishedAt
  } = req.body;
  const coverImage = req.file ? "http://localhost:3000/files/" + req.file.filename : "";


  try {
    const article = await ArticleSchema.create({
        title,
        slug,
        summary,
        content,
        coverImage,
        tags,
        status,
        readingTimeMinutes,
        publishedAt
    });
    res.status(201).json({ message: "article added successfully!", article });
  } catch (error) {
    console.error("error adding article", error);
    res.status(500).json({ message: "Error adding article" });
  }
});

// get about by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const article = await ArticleSchema.findById(id);

    res.status(200).json({ message: "article founded successfully!", article });
  } catch (error) {
    console.error("error founding article", error);
    res.status(500).json({ message: "Error founding article" });
  }
});

//   update about
router.put("/:id",  upload.single("coverImage"), async (req, res) => {
  const id = req.params.id;
  const {
    title,
        slug,
        summary,
        content,
        coverImage,
        tags,
        status,
        readingTimeMinutes,
        publishedAt
  } = req.body;

  if (req.file) {
    coverImage = "http://localhost:3000/files/" + req.file.filename;
  }
  try {
    const article = await ArticleSchema.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        summary,
        content,
        coverImage,
        tags,
        status,
        readingTimeMinutes,
        publishedAt
      },
      { returnDocument: "after", runValidators: true },
    );
    if (!article) {
      return res.status(404).json({ message: "article not found" });
    }

    res.status(200).json({ message: "article updated successfully!", article });
  } catch (error) {
    console.error("error updating article", error);
    res.status(500).json({ message: "Error updating article" });
  }
});

// delete article
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const article = await ArticleSchema.findByIdAndDelete(
        id
      );
      if (!article) {
        return res.status(404).json({ message: "article not found" });
      }

      res.status(200).json({ message: "article deleted successfully!", article });
    } catch (error) {
      console.error("error updating article", error);
      res.status(500).json({ message: "Error deleted article" });
    }
  });
  
module.exports = router;
