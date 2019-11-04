const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveData(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken! Try again!'))
    }
}

const deleteNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.filter((note) => note.title !== title)
    if(notes.length === findNote.length){
        console.log(chalk.red.inverse('Note not found!'))
    } else {
        saveData(findNote)
        console.log(chalk.green.inverse('Note removed succssfully!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    
    console.log(chalk.inverse('Your notes:'))
    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const read = notes.find((note) => note.title === title)
    
    if(read){
        console.log(chalk.inverse(read.title))
        console.log(read.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveData = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes,
    readNote: readNote
}