const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('data.json', JSON.stringify(notes));
};
const addNote = (title, body) => {
  console.log('Adding note');
  const notes = fetchNotes();
  const note = {
    title,
    body,
  };
  const duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};
const getNote = (title) => {
  console.log('Getting note');
  const notes = fetchNotes();
  const note = notes.filter(note => note.title === title);
  return note[0];
};
const removeNote = (title) => {
  console.log('Removing note');
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  console.log(filteredNotes);
  saveNotes(filteredNotes);
};
const getAll = () => {
  console.log('Getting notes');
  const notes = fetchNotes();
  return notes
};

const logNote = (note) => {
  console.log('--');
  console.log(`Title ${note.title}`);
  console.log(`Body ${note.body}`);
};

module.exports = {
  addNote,
  getNote,
  removeNote,
  getAll,
  logNote,
};
