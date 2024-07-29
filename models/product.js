const { Schema, model } = require('mongoose');
const Joi = require('joi');

module.exports.Product = model('Product', Schema({
    name: String,
    description: String,
    price: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    quantity: Number
}, { timestamps: true }));

module.exports.validate = product => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255),
        description: Joi.string().max(2000),
        price: Joi.number(),
        quantity: Joi.number(),
        category: Joi.string(),
    });
    return schema.validate(product);
}
