const express = require('express')
const app = express()
app.use(express.json())

const db = require('./models')

const postRouter = require('./routes/Posts')
const usersRouter = require('./routes/Users')
app.use('/posts', postRouter)
app.use('/auth', usersRouter)

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('server running on port 3001')
  })
})