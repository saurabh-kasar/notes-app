const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
    command:'add',
    describe:'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        },
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command:'read',
    describe:'Read an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.command({
    command:'remove',
    describe:'Delete a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
       notes.deleteNote(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'Lists all note',
    handler() {
        notes.listNotes()
    }
})


yargs.parse()