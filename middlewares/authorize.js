const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
    // ekta request er sathe token ta tar header a ase . Header er modhe key value pair a thake so j key tar mdohe tahke se key tar name holo Authorization
    let token = req.header('Authorization')

    // check kore dekhbo token send korrse ki na . jode na kore bolbo token chara ekhne kno kaj nai . 
    if (!token) {
        return res.status(401).send("Access Denied ! No token Provided")
    }
    // token ta dekhte emn hoy -> Bearer dddd12332564654654      // ei part tuku hol token er smane Bearer key word ta thakbe 
    // jode token provide kroe tahle tahle token er patter ta hbe holo ...

    else {
        token = token.split(" ")[1].trim()   // Bearer mytoken eita pura ta ekta string er modhe to space thake eta k space er upor depend kore vag korte hbe . trim ta suru r ses er j psace
        // pabe seta k remove kore felbe . So token er modhe gelo 1 index a jeta thake I mean sudhu token ta 

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        // decode korar jnno vai amader jwt er help nite hbe karon ei token banaise . ei decode kroe er modhe ki ase seta bole dibe 

        // jode decode korte na pare 

        if (!decoded) {
            return res.status(400).send("Invalid Token")
        }

        // jode token ta varify korte partse 

        // req kinut ekta object er modhe new property set kroe taar value diye dawa jay . req er modhe header o ekta property cilo jkhne thke ami token ta tullam
        // ekhn req er modhe ami ekta new property set korbo jar name holo user and ter modhe ami decoded howa information gula rakhbo 

        req.user = decoded

        next() // eta ekta middleware tai next function ta obossoi call kore dite hbe 
    }

}