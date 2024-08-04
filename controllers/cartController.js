const _ = require('lodash')
const { CartItem } = require('../models/cartItem')

// eta cartItem take create korbe 
module.exports.createCartItem = async (req, res) => {

    // req body product er pirce ta and id ta nilam 
    let { price, product } = _.pick(req.body, ["price", "product"])

    // Then check korbo j eta already exists kore ki na ...
    const item = await CartItem.findOne({
        user: req.user._id,
        product: product
    })
    // ei user ei product ta already cart a add korse ki na seta amra check korbo

    if (item) {
        return res.status(400).send("Item already exists in Cart")
    }

    let cartItem = new CartItem({
        price: price,
        product: product,
        user: req.user._id
    })

    // price , product and user ei 3 tai enough ekta product a ja ja thakbe seta

    const result = await cartItem.save()
    // cartItem take save kore dite hbe 

    res.status(201).send({
        message: "Added to Cart Successfully",
        data: result
    })


}

// eta cartItem gula k get korabe 
module.exports.getCartItem = async (req, res) => {

    const cartItems = await CartItem.find({
        user: req.user.id
    }).populate('product', 'name').populate('user', 'name');

    return res.status(200).send(cartItems)

}

// eta cartTIem gula k update korabe ...

module.exports.updateCartItem = async (req, res) => {
    // ekhne ami expect krtse j cart item ta update korbo tar id ta asbe tarpor ekhn j koyta item add korse tar theke ek besi add hye asbe 

    const { _id, count } = _.pick(req.body, ["count", "_id"])
    const userId = req.user._id;

    await CartItem.updateOne({ _id: _id, user: userId }, { count: count })

    return res.status(200).send("Item updated successfully")
}

// cart er kno item delete kore dite chaile eta korte hbe 

module.exports.deleteCartItem = async (req, res) => {

}