const express = require('express')
const dotenv = require('dotenv')
//const notes = require('./data/notes')
const cors = require('cors')
const connectDB = require('./config/db')
const userRouter = require('./Routes/UserRoutes')
const notesRouter = require('./Routes/NoteRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleWare')

dotenv.config()

const PORT = process.env.PORT || 5001
const app = express()

connectDB()

app.use(cors("http://localhost:3000"))

app.use(express.json())

app.use('/', userRouter)
app.use('/notes', notesRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})

