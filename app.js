require('express-async-errors')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const userRouter = require("./routes/userRouter")
const categoryRouter = require("./routes/categoryRouter")
const productRouter = require("./routes/productRouter")

const app = express()

app.use(express.json())

app.use(cors());


if (process.env.NODE_ENV === "development") {

    app.use(morgan('dev'))
}

app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)


app.use((err, req, res, next) => {
    return res.status(500).send("Something Failed")
})




module.exports = app;
