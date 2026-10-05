const mongoose = require('mongoose');
const settingSchema = new mongoose.Schema({
    siteName: { type: String, default: "My Portfolio" },
    siteDescription: { type: String },
    primaryColor: { type: String, default: "#000000" },
    enableBlog: { type: Boolean, default: true },
    enableContactForm: { type: Boolean, default: true },
    seoKeywords: [{ type: String }],
    googleAnalyticsId: { type: String },
    themeMode: { 
      type: String, 
      enum: ['light', 'dark', 'system'],  
      default: 'system' 
    }

},{timestamps: true});

const SettingSchema = mongoose.model("setting", settingSchema);
module.exports = SettingSchema;