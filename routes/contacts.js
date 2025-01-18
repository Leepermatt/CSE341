const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connect'); 
const { ObjectId } = require('mongodb');
// Route to get all contacts
router.get('/', async (req, res) => {
  try {
    const db =  getDb(); // Connect to the database
    const contacts = await db.db().collection('contacts').find({}).toArray(); // Retrieve all documents
    res.status(200).json(contacts); // Send the contacts as JSON
  } catch (err) {
    console.error('Error retrieving contacts:', err.message); // Log any errors
    res.status(500).json({ message: 'Failed to retrieve contacts' }); // Respond with error message
  }
});

// Route to get a single contact by ID
router.get('/:id', async (req, res) => {
    try {
      const db = getDb(); 
      const contactId = req.params.id;  
      
      
      if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const contact = await db.db().collection('contacts').findOne({ _id: new ObjectId(contactId) });  
  
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });  
      }
  
      res.status(200).json(contact);  
    } catch (err) {
      console.error('Error retrieving contact by ID:', err.message);
      res.status(500).json({ message: 'Failed to retrieve contact' });  
    }
  });

module.exports = router;
