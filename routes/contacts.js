const express = require('express');
const router = express.Router();
const { getDb } = require('../db/connect'); // Adjust the path to your connect.js file
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
      const db = getDb(); // Get the database connection
      const contactId = req.params.id;  // Get the 'id' parameter from the URL
      
      // Ensure the contactId is a valid ObjectId
      if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const contact = await db.db().collection('contacts').findOne({ _id: new ObjectId(contactId) });  // Find document by ObjectId
  
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });  // If no contact is found, return 404
      }
  
      res.status(200).json(contact);  // Return the contact as JSON
    } catch (err) {
      console.error('Error retrieving contact by ID:', err.message);
      res.status(500).json({ message: 'Failed to retrieve contact' });  // Respond with a 500 error if query fails
    }
  });

module.exports = router;
