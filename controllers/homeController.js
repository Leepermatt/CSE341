const displayName = (req, res) => {
  res.send('Joseph Smith');
};

module.exports = {
  displayName,
};


const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getIndividual = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};
const addContact = async (req, res) => {
  try {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact);

    if (result.acknowledged) {
      res.status(201).json({ message: 'Contact added successfully', id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to add contact' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while adding the contact' });
  }
};


const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id); // Convert string ID to ObjectId
    const updatedContact = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
      },
    };

    const result = await mongodb.getDb().db().collection('contacts').updateOne({ _id: userId }, updatedContact);

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Contact not found' });
    } else if (result.modifiedCount === 0) {
      res.status(200).json({ message: 'No changes made to the contact' });
    } else {
      res.status(200).json({ message: 'Contact updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the contact' });
  }
};

module.exports = { updateContact };

const deletePerson = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id); // Convert id to ObjectId
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send(); // Success, no content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the contact' });
  }
};


module.exports = {
  getAll,
  getIndividual,
  addContact,
  updateContact,
  deletePerson
};