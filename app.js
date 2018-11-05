console.log('starting app');
const yargs = require('yargs');
const notes = require('./notes');

const titleOptions = {
  demand: true,
  describe: 'Title of note',
  alias: 't',
};

const bodyOptions = {
  demand: true,
  describe: 'Body of note',
  alias: 'b',
};

const { argv } = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('getAll', 'Get all notes')
  .command('get', 'Get a specific note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a specific note', {
    title: titleOptions,
  })
  .help();

const command = argv._[0];
console.log(argv);
if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    notes.logNote(note);
  } else {
    console.log('Already taken');
  }
} else if (command === 'get') {
  const note = notes.getNote(argv.title);
  if (note) {
    notes.logNote(note);
  }
} else if (command === 'remove') {
  notes.removeNote(argv.title);
} else if (command === 'getAll') {
  const allNotes = notes.getAll();
  allNotes.forEach((note) => {
    notes.logNote(note);
  });
} else {
  console.log('Invalid command');
}
