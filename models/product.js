const { Schema, Model, model } = require("mongoose")
const Joi = require('joi')

module.exports.Product = model("Product", Schema(
    {

        name: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,  // category name ekta feild thakbe jar modhe ekta id thakbe id ta asole onno ekta object er id kon object er id 
            ref: "Category", // Category model er modhe j object gula ase tar kno ektar id 
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        photo: {
            // photo er element gula k amara binary hisebe set korbo 
            data: Buffer,
            contentType: String,
        }

    },
    {
        timestamps: true,
    }
))


module.exports.validate = product => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(3).max(2555).required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        category: Joi.string().required()
    })

    return schema.validate(product)
}