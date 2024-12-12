const express = require('express')
//const dotenv = require('dotenv')
//const notes = require('./data/notes')
const cors = require('cors')
const connectDB = require('./config/db')
const userRouter = require('./Routes/UserRoutes')
const notesRouter = require('./Routes/NoteRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleWare')
const path = require('path')

//dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()

connectDB()

app.use(cors({ origin: '*' })); 

app.use(express.json())

app.use('/', userRouter)
app.use('/notes', notesRouter)
app.use(notFound)
app.use(errorHandler)

//--------------------deployment---------------------

const __dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/build")))
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}else{
    app.get('/', (req,res)=>{
        res.send("API is Running Successfully")
    })
}

//--------------------deployment----------------------

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})

