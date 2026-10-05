const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String, index: true }],
    status: { 
      type: String, 
      enum: ['draft', 'published'], 
      default: 'draft',
      index: true 
    },
    readingTimeMinutes: { type: Number },
    publishedAt: { type: Date }

},{timestamps: true});

const ArticleSchema = mongoose.model("article", articleSchema);
module.exports = ArticleSchema;