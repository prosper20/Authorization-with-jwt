
const { isValidObjectId } = require('mongoose');
const createError = require('http-errors');
const Note = require('../models/noteModel');

module.exports.createNote = async function createNote (req, res, next){
    try {
        let user_id = req.user._id;
        let { title, note_text } =req.body;
        if (!note_text) throw createError(400, 'note text is required');
        
        const note = await Note.makeNote(user_id, title, note_text);
        
        res.status(201).json(note)

    } catch (error) {
        next(error);
    }
}

module.exports.fetchAllNotes = async function fetchAllNotes (req, res, next){
    try {
        let user_id = req.user._id;
        
        const notes = await Note.find({user_id});
        
        res.status(201).json(notes)

    } catch (error) {
        next(error);
    }
}

module.exports.fetchNoteWithId = async function fetchNoteWithId (req, res, next){
    try {
        if (!isValidObjectId(req.params.id)) throw createError(400, 'invalid note Id');
        let note = await Note.findById(req.params.id);
        if (!note) throw createError(404, 'no notes were found');

        res.status(201).json(note)

    } catch (error) {
        next(error);
    }
}

module.exports.updateNoteWithId = async function updateNoteWithId (req, res, next){
    try {
        if (!isValidObjectId(req.params.id)) throw createError(400, 'invalid note Id');
        let note = await Note.findById(req.params.id);
        if (!note) throw createError(404, 'no notes were found');
        
        note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        res.status(201).json(note)

    } catch (error) {
        next(error);
    }
}
// find and delete note with Id 
module.exports.deleteNoteWithId = async function deleteNoteWithId (req, res, next){
    try {

        if (!isValidObjectId(req.params.id)) throw createError(400, 'invalid note Id');
        
        let note = await Note.findById(req.params.id);
        //(!note) && res.status(400).json({ error:'Note not found' });
        let multiNote = null;
        (note) ? note = await Note.findByIdAndDelete(req.params.id) : multiNote = await Note.deleteMany({user_id: req.params.id});
        if (!note && multiNote.deletedCount == 0) throw createError(404, 'no notes were found');
        if (multiNote) {
            res.status(201).json(multiNote);
        } else{
            res.status(201).json(note)
        }
        

    } catch (error) {
        next(error);
    }
}