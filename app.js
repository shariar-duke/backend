const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const userRouter = require("./routes/userRouter")  // user Router k import kore nia aslam 

const app = express()

app.use(express.json())

app.use(cors()); // Call the middleware function


if (process.env.NODE_ENV === "development") {

    app.use(morgan('dev'))
}

app.use('/api/user', userRouter)


module.exports = app;


// ekhnae duta kaj holo ekta holo userRouter k amra call kore anlam
// Then amra jode localhost:3001/api/user ei porjonto type kore tahle amader sob kisu userRouter er modhe gia khoja suru hbe thtat's it 