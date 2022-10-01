const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
    },
    noteText: { type: String, required: true },
  },
  { timestamps: true }
);

//create note static method
noteSchema.statics.makeNote = async function (userId, title, noteText) {
  const note = await this.create({ userId, title, noteText });
  return note;
};

module.exports = mongoose.model('note', noteSchema);
