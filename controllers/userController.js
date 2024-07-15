// Routing er joto function thakbe sob gula ami ekhne rakhbo jmn signIn , signUp egular jnno 
const bcrypt = require('bcrypt')
const _ = require('lodash') // eta holo lodash import korar syntax 
const { User, validate } = require("../models/user") // ekhne j hutu amra function gula lekhbo so ekhane amader model ta lagbe ..

export const signUp = async (req, res) => {

    const { error } = validate(req.body) // validate function ekta object return kore tar ekta property holo error . sei error take object distructuirng kore niyeche 

    if (error) {
        return res.status(400).send(error.details[0])
    }

    let user = {};

    user = await User.findOne({ email: req.body.email }) // model er modhe amra khujbo ei name a kno user already ase naki , model er modhe khoj manei data er mdohe khoja 

    if (user) {
        return res.status(400).send("User already registered")
    }

    // till now duita test pass hoise ekta holo j data gula postman a dise oigula validation pass kroe ashce . no problem . r ekta holo ei user er j email ei email dia db te kno user
    // register nai so ekhn eta k register kore dile new user registraton hoye jabe 

    user = new User(_.pick(req.body, ['name', 'email', 'password']))

    const salt = await bcrypt.genSalt(10) // password bananor age ekta salt string lage 

    user.password = await bcrypt.hash(user.password, salt)

    // ekhn token ta create korte hbe 

    const token = user.generateJWT()

    // ekhn ei object take save kore dbo jate eta model a save thake ..

    try {
        const result = await user.save()
        // jode successfully save korte pare tahle ekta 201 resopnse jabe 
        return res.status(201).send({
            message: "Registration Successful",
            token: token,
            // user theke olop kisu info send krobo ami 
            user: _.pick(result, ["_id", "name", "email"])

        })
    } catch (error) {
        // jode kno karon a fail , fail onek karon a hote pare like server a problem or  mongodb te problem 

        return res.status(500).send("Something Failed")
    }

}

export const signIn = async (req, res) => {

}