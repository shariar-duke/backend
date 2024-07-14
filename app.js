const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json()) // ei middleware tar kaj hosche post method a data k jno json a convert kore felte apre 

app.use(cors)

const app = express()

if (process.env.NODE_ENV === "development") {
    // amra jode application ta development a chalai tahole amra chache j amra ki ki request kokhn kortse ogula amader console.log a dekhak that's it 
    app.use(morgan('dev'))
}


module.exports = app;