const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/users.js')
const cookies = require('cookie-parser')

const app = express()


app.listen(3000, () => {
    console.log("Server running on port 3000")
})

app.use(express.json())
app.use(cors())
app.use(cookies())

app.use('/api/users', userRoutes)