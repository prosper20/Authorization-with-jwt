//const { isValidObjectId } = require('mongoose');
const createError = require('http-errors');
const Note = require('../models/noteModel');

module.exports.createNote = async function createNote(req, res, next) {
  try {
    const userId = req.user._id;
    const { title, noteText } = req.body;
    if (!noteText) throw createError(400, 'note text is required');

    const note = await Note.makeNote(userId, title, noteText);

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

module.exports.fetchAllNotes = async function fetchAllNotes(req, res, next) {
  try {
    const userId = req.user._id;

    const notes = await Note.find({ userId });

    res.status(201).json(notes);
  } catch (error) {
    next(error);
  }
};

module.exports.fetchNoteWithId = async function fetchNoteWithId(req, res, next) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) throw createError(404, 'no notes were found');

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

module.exports.updateNoteWithId = async function updateNoteWithId(req, res, next) {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) throw createError(404, 'no notes were found');

    note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};
// find and delete note with Id
module.exports.deleteNoteWithId = async function deleteNoteWithId(req, res, next) {
  try {
    let note = await Note.findById(req.params.id);
    //(!note) && res.status(400).json({ error:'Note not found' });
    let multiNote = null;

    /** if there is a note by the id provided delete it otherwise check if there are any notes
     * with userId matching the id provided and delete them
     */
    if (note) {
      note = await Note.findByIdAndDelete(req.params.id);
    } else {
      multiNote = await Note.deleteMany({ userId: req.params.id });
    }
    /*note
      ? (note = await Note.findByIdAndDelete(req.params.id))
      : (multiNote = await Note.deleteMany({ user_id: req.params.id })); */

    if (!note && multiNote.deletedCount === 0) throw createError(404, 'no notes were found');
    if (multiNote) {
      res.status(201).json(multiNote);
    } else {
      res.status(201).json(note);
    }
  } catch (error) {
    next(error);
  }
};
