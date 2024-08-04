const { required } = require('joi');
const { Schema, model } = require('mongoose');

const CartItemSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    price: Number,
    count: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // user jode ei product ta purchase kore fele tahle tahle cart theke ei product ta soray felbo. karon cart holo purchase korar ager situation ta. 
    // shopping mall a jmn jhuri te rakha hoy...

}, {
    timestamps: true
})


module.exports.CartItemSchema = CartItemSchema;
module.exports.CartItem = model("CartItem", CartItemSchema)

// ekhne alad kore scheama ta export korar karon holo jokhn amra order ta crate krobo tokhn eta okhn edorkar porbe.....ei scheam diye or kaj tao hbe 
