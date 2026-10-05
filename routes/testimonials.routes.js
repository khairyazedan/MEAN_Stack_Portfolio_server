const express = require("express");
const router = express.Router();
const TestimonialSchema = require("../schema/testimonials.schema.js");

// public: approved only
router.get("/", async (req, res) => {
  try {
    const allTestimonials = await TestimonialSchema.find({ isApproved: true }).sort("order -createdAt");
    res.status(200).json({ message: "testimonials found successfully!", allTestimonials });
  } catch (error) {
    console.error("error finding testimonials", error);
    res.status(500).json({ message: "Error finding testimonials" });
  }
});

// admin: all (keep this ABOVE any "/:id" route)
router.get("/all", async (req, res) => {
  try {
    const allTestimonials = await TestimonialSchema.find().sort("-createdAt");
    res.status(200).json({ message: "testimonials found successfully!", allTestimonials });
  } catch (error) {
    console.error("error finding testimonials", error);
    res.status(500).json({ message: "Error finding testimonials" });
  }
});

// public: submit (always starts unapproved)
router.post("/", async (req, res) => {
  const { authorName, authorTitle, company, authorAvatar, relationship, content, rating } = req.body;
  // isApproved and order are NOT read from the body

  try {
    const testimonial = await TestimonialSchema.create({
      authorName, authorTitle, company, authorAvatar, relationship, content, rating,
    });
    res.status(201).json({ message: "testimonial added successfully!", testimonial });
  } catch (error) {
    console.error("error adding testimonial", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error adding testimonial" });
  }
});

// admin: approve / unapprove (matches your service URL)
router.patch("/:id/isApproved", async (req, res) => {
  const { isApproved } = req.body;

  if (typeof isApproved !== "boolean") {
    return res.status(400).json({ message: "isApproved must be true or false" });
  }

  try {
    const testimonial = await TestimonialSchema.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { returnDocument: "after" },
    );
    if (!testimonial) return res.status(404).json({ message: "testimonial not found" });

    res.status(200).json({ message: "testimonial updated successfully!", testimonial });
  } catch (error) {
    console.error("error updating testimonial", error);
    res.status(500).json({ message: "Error updating testimonial" });
  }
});

// admin: delete
router.delete("/:id", async (req, res) => {
  try {
    const testimonial = await TestimonialSchema.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "testimonial not found" });

    res.status(200).json({ message: "testimonial deleted successfully!", testimonial });
  } catch (error) {
    console.error("error deleting testimonial", error);
    res.status(500).json({ message: "Error deleting testimonial" });
  }
});

module.exports = router;