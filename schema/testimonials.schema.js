const mongoose = require('mongoose');
const testimonialSchema = new mongoose.Schema({
    authorName: { type: String, required: true },
  authorTitle: { type: String, required: true }, 
  company: { type: String },
  authorAvatar: { type: String },
  relationship: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  isApproved: { type: Boolean, default: false, index: true },
  order: { type: Number, default: 0 }

},{timestamps: true});

const TestimonialSchema = mongoose.model("testimonial", testimonialSchema);
module.exports = TestimonialSchema;