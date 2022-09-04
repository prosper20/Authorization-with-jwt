const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    title: {
        type: String,
    },
    note_text: {
        type: String,
        required: true
    }
}, {timestamps: true});

//create note static method
noteSchema.statics.makeNote = async function (user_id, title, note_text) {

    const note = await this.create({user_id, title, note_text})
    return note;
};

module.exports = mongoose.model('note', noteSchema);