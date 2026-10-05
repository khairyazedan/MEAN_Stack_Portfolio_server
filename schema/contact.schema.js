const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['unread', 'read', 'archived', 'replied'], 
    default: 'unread',
    index: true 
  }

},{timestamps: true});

const ContactSchema = mongoose.model("contact", contactSchema);
module.exports = ContactSchema;