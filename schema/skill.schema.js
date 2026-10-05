const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Tools', 'Soft Skills'],
      index: true 
    },
    proficiencyLevel: { type: Number, min: 1, max: 100 },
    iconUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }

},{timestamps: true});

const SkillSchema = mongoose.model("skill", skillSchema);
module.exports = SkillSchema;