const { Schema, model } = require('mongoose')
const Joi = require('joi') // schema validdation hbe 
const jwt = require('jsonwebtoken')

// ekta userSchema create korbo 
// schema ekta contructor er first peramter holo ekta object jar modhe ase j ei schema te ki ki property thakbe 
// second ta hbe holo ekta timestamp proerty jate buja jabe j eta kokhn create hoise  
const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2024

    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'

    }
},

    {
        timesStamps: true
    }
)

// till now userSchema creta hoise er modhe jode amra ekta function dhukate chai tahle seta er modhe methods name ekta property ase setar mohdhe nite hbe 

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
        name: this.name
    }, process.env.JWT_SECRET_KEY,
        {
            expiresIn: "7d"
        })
    return token;
}

const validateUser = ((user) => {
    // user name holo j data ta check korbo jeta postman ba frontend theke asbe . validateUser function ta ore peramter hibe nibe 

    // data ta ekta object hisebe asbe oi object tar property gula kon object er moto hbe tar ekta model banabo  seta holo ei schema then etar sathe ota milabo
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    })
    // ekhane oi stardard object er sahte ota k milaise 
    return schema.validate(user)
})


module.exports.User = model('User', userSchema)
module.exports.validate = validateUser