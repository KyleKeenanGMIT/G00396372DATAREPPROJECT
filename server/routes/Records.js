//express input
const express = require('express');
const router = express.Router();//router import - used to go to different webpages of the project.
const Record = require('../components/Record');//gathered from the componetns folder.

// gathers all existing records.
router.get('/', async (req, res) => {
    try {
        const records = await Record.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }//error message if the existing records are unable to be attained.
});

// creating a new record.
router.post('/', async (req, res) => {
    const record = new Record({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
    });

    try {
        const newRecord = await record.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }//displays error message if the new record is unable to be saved to the server.
});

// updating existing record.
router.patch('/:id', async (req, res) => {
   
});//arrow func

// Deleting exising record
router.delete('/:id', async (req, res) => {
    
});//arrow func

module.exports = router;
