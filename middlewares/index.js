const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// pura app take amra middleware hisebe accept korte chache . accept kroar por er upr middleware gula apply kora jaitse ..
module.exports = (app) => {
    app.use(express.json());
    app.use(cors())

    if (process.env.NODE_ENV === "development") {

        app.use(morgan('dev'))
    }
}
// ekhen theke mainly ekta function k export kora hoise..jeta app k nibe and nawar por or upor middleware gula apply kore dibe
