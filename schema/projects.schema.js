const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  summary: { type: String, required: true },
  description: { type: String }, 
  coverImage: { type: String },  
  images: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  technologies: [{ type: String, index: true }],
  featured: { type: Boolean, default: false, index: true },
  order: { type: Number, default: 0 },
  completedAt: { type: Date }

},{timestamps: true});

const ProjectSchema = mongoose.model("project", projectSchema);
module.exports = ProjectSchema;