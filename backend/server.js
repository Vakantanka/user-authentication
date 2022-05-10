require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')

const userRoutes = require('./route/user')
const contentRoutes = require('./route/content')
app.use('/api/content', contentRoutes)
app.use('/api/user', userRoutes)

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected.")
  })
  .catch(() => console.log("Error."))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})