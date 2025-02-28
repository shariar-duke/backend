const userRouter = require("../routes/userRouter")
const categoryRouter = require("../routes/categoryRouter")
const productRouter = require("../routes/productRouter")
const cartRouter = require("../routes/cartRouter.js")
const profileRouter = require('../routes/profileRouter.js')
// app.js theke joto routes ase sob gula k ekhne nia aslam..

// ei file theke ekta function amra export kore dibo 
module.exports = (app) => {
    // ei function tao amader app nibe coz app er uporei eta apply korbe ..
    app.use('/api/user', userRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/product', productRouter)
    app.use('/api/cart', cartRouter)
    app.use("/api/profile", profileRouter)
}