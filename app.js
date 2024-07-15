require('express-async-errors')
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

// ei middleware ta amra specially error handeing er jnno lekhtse jate promise handle kroete giey kno error paile seta handle korete pare 
// kno middleware ta error handle korar jnno use korte hole er first pearmater ta err dite hbe 
app.use((err, req, res, next) => {
    return res.status(500).send("Something Failed")
})


// last a ei middleware ta lekhlam karon er uporer jode route a promise type error hbe hole control ta pass hbe holo ei middlware a r eta porjnot seta pass kore dbe holo oi 
// package ta jar nam holo express-async-errors , Ager middleware gular kno tate then use kora nai . so controll dhakka mare er kase dbe holo ei middleware ta 


module.exports = app;
