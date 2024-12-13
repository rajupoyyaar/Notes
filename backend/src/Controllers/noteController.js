const asyncHandler = require('express-async-handler')
const Notes = require('../models/notesModel')

const getNotes = asyncHandler(async (req,res)=>{
    const notes = await Notes.find({user:req.user._id})
    res.json(notes) 
})

const createNote = asyncHandler(async (req,res)=>{
    const {title,content,category} = req.body;

    if(!title || !content || !category){
        res.status(400)
        throw new Error('Please Fill all the fields')
    }
    else{
        const note = new Notes({user:req.user._id, title, content, category})
        const createdNote = await note.save()
        res.status(201).json(createdNote)
    }
})

const getNoteById = asyncHandler(async (req,res)=>{
    const note = await Notes.findById(req.params.id)
    if(note){
        res.json(note)
    }
    else{
        res.status(400).json({message: "Notes Not Found"})
    }
})

const updateNote = asyncHandler(async (req,res)=>{
    const {title,content,category}= req.body
    
    const note = await Notes.findById(req.params.id)

    if(note.user.toString() !== req.user._id.toString()){
        res.status(400)
        throw new Error('You Cant Perform this Action')
    }

    if(note){
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save()
        res.json(updatedNote)
    }else{
        throw new Error("Note Not Found")
    }
})

const deleteNote = asyncHandler(async (req,res)=>{
    const note = await Notes.findById(req.params.id)

    if(note.user.toString() !== req.user._id.toString()){
        res.status(400)
        throw new Error('You Cant Perform this Action')
    }

    if(note){
        await note.deleteOne()
        res.json({message: "Note Removed"})
    }
    else{
        throw new Error("Note not Found")
    }
})


module.exports = {getNotes, createNote, getNoteById, updateNote, deleteNote}