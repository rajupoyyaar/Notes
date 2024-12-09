const express = require('express')
const dotenv = require('dotenv')
const notes = require('./data/notes')

dotenv.config()

const PORT = process.env.PORT || 5001
const app = express()

app.get("/api/notes", (req,res)=>{
    res.json(notes)
})

app.get("/api/notes/:id", (req,res)=>{
    const note = notes.find((n) => n._id === req.params.id)
    res.send(note)
})

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})

