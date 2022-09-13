const router = require('express').Router();
const { createNewNote, validateNote, deleteNote } = require('../../lib/notes.js');
const { notes } = require('../../db/db.json');
const ShortUniqueId = require('short-unique-id');

router.get('/notes', (req, res) => {
    // READ db.json and RETURN all SAVED NOTES as json
    res.json(notes);
});

router.post('/notes', (req, res) => {
    // RECEIVE a new note to save on the request body,
    // ADD it to db.json, then RETURN the new note to the client
    // set id based on what the next index of the array will be

    // set unique ID
    const uid = new ShortUniqueId({ length: 16 });
    req.body.id = uid();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    // READ all notes from db.json, REMOVE note given `id`
    // property, then REWRITE the notes to db.json
    console.log(`DELETE Request Called for /api/notes/${req.params.id} endpoint`);

    deleteNote(req.params.id, notes);

    res.send(`DELETE Request Called for /api/notes/${req.params.id} endpoint`);
});

module.exports = router;
