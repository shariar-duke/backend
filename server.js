require('dotenv/config') // eta korlei env variable gula availabe hbe amader whole application a 

const mongoose = require('mongoose')
const app = require("./app.js")


mongoose.connect(process.env.MONGODB_URL_LOCAL).then(() => console.log("connected to MongoDB")).catch(err => console.error("Mongodb connection failed"))

const port = process.env.PORT || 3001;


app.listen(port, () => console.log("App running on port ", port))
