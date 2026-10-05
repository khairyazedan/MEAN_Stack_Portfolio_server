const express = require("express");
const router = express.Router();
const ContactSchema = require("../schema/contact.schema.js");


router.get('/', async(req, res)=>{
  try{
    const allContacts = await ContactSchema.find().sort('-createdAt');
    res.status(200).json({ message: "all messages founded successfully!", allContacts });

  }catch(error){
    console.error("error finding all messages", error);
    res.status(500).json({ message: "Error finding all messages" });
  }
});


router.post("/", async (req, res) => {
  const { senderName, senderEmail, subject, message, status } = req.body;

  try {
    const contact = await ContactSchema.create({
      senderName,
      senderEmail,
      subject,
      message,
      status,
    });
    res.status(201).json({ message: "contact added successfully!", contact });
  } catch (error) {
    console.error("error adding contact", error);
    res.status(500).json({ message: "Error adding contact" });
  }
});

// get contact by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await ContactSchema.findById(id);

    res.status(200).json({ message: "contact founded successfully!", contact });
  } catch (error) {
    console.error("error founding contact", error);
    res.status(500).json({ message: "Error founding contact" });
  }
});

//   update contact
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { senderName, senderEmail, subject, message, status } = req.body;
  try {
    const contact = await ContactSchema.findByIdAndUpdate(
      id,
      {
        senderName,
        senderEmail,
        subject,
        message,
        status,
      },
      { returnDocument: "after", runValidators: true },
    );
    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }

    res.status(200).json({ message: "contact updated successfully!", contact });
  } catch (error) {
    console.error("error updating contact", error);
    res.status(500).json({ message: "Error updating contact" });
  }
});

// delete contact
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await ContactSchema.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }

    res.status(200).json({ message: "contact deleted successfully!", contact });
  } catch (error) {
    console.error("error updating contact", error);
    res.status(500).json({ message: "Error deleted contact" });
  }
});

module.exports = router;
