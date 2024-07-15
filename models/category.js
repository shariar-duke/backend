const { Schema, Model, model } = require("mongoose")
const Joi = require('joi')

module.exports.Category = model("Category", Schema(
    {

        name: {
            type: String,
            unique: true,
        }
    },
    {
        timestamps: true, // Corrected typo from 'timesStamps' to 'timestamps'
    }
))

//  category to create krote hbe . Create kroar somoy jno right format a create hoy ei jnno ekta validate function lekhbo ami 
// function tar name hbe validate and eta ekta perameter nibe jar name hbe holo category 
module.exports.validate = category => {
    // ekta sechma bnaabo sei shcemaar sathe user j input dbe seta compare hbe 

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required()
    })

    return schema.validate(category)
}