const _ = require('lodash')
const { Category, validate } = require('../models/category')

// ekhane duta function banabo ekta category create er jnno r ekta holo category get kroar jnno

module.exports.createCategory = async (req, res) => {
    // amra age check kore dbo j category ta send kortse otar format ta thik ase ki na 

    const { error } = validate(_.pick(req.body, ["name"]))

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const category = new Category(_.pick(req.body, ["name"]))

    const result = await category.save();
    return res.status(201).send({
        message: "Category created successfully",
        data: {
            name: result.name
        }
    })

}

module.exports.getCategories = async (req, res) => {

    // ekhne just existing joto category ase sob gula fetch kore nia asbo 

    const categories = await Category.find().sort({ name: 1 })  // eta array find na eta mongoose er find 

    return res.status(200).send(categories)

}