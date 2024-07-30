require('express-async-errors')
const express = require('express')
const md = require('./middlewares') // eta k middleware er index.js theke nia aslam..
const routeMd = require('./middlewares/routes') //
const app = express()
// eta holo default middleware er jnno 
md(app)
// app middleware r jnno r ekta lekhbo
routeMd(app)

app.use((err, req, res, next) => {
    return res.status(500).send("Something Failed")
})

module.exports = app;


