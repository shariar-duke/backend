const _ = require('lodash')
const { Product, validate } = require('../models/product')
const formidable = require('formidable') // formidablle package take install korlam 
const fs = require("fs") // node er default file read kroar system keo import kore anlam 

module.exports.createProduct = async (req, res) => {

    const form = new formidable.IncomingForm() // j form ta kore amader kase data asbe tar kas theke data niye ei form er modhe rakhe dbe 
    form.keepExtensions = true; // ekhne boltse j amader file a jode data ase thake tahle j data gula aslo se extension gula ami rakhe dbo 

    form.parse(req, (err, feilds, files) =>  // form parse amader ei post req ta nibe , niey ekta call back function call kore dibe 
    {
        if (err) {
            return res.status(400).send("Something Went Wrong");

        } // eta te check korlam form theke data gula thik vbe asche naki

        // ekhn check korbo holo j data gula asche ogula validation pass kore naki 

        const { error } = validate(_.pick(feilds, ["name", "description", "price", "category", "quantity"]))
        // age egula asto holo req.body theke ekhn e gula asbe holo feilds theke , feild a eka ekta proprty thakbe 

        if (error) {
            // jode validation a fail khay . product er data jmn howar kotha cilo tmn na hoye thake then 
            return res.status(400).send(error.details[0].message)
        }

        // form a data asche naki sei validation jode par kore thake and also j data gula asche ogula amar validate datar sathe mile naki seta par korar por eta db te save kroe 
        // dbo

        const product = new Product(feilds) // karon feilds ero sob key value akarei thakbe 

        // ekhn check korbo photo asbe ki na. photo asbe holo files er vitore . normal object asbe holo feilds er vitore but photo asbe holo files er vitore eta k onno vbe handle
        // korte hbe 

        if (feilds.photo) // input type = "file" name ="photo"
        {
            fs.readFile(files.photo.path, (err, data) => {
                if (err) {
                    return res.status(400).send("Problem in file data")

                }

                product.photo.data = data;
                product.photo.contentType = files.photo.type;
                product.save((err, result) => {
                    if (err) {
                        res.status(500).send("Internal Server error")
                    }

                    else {
                        return res.status(201).send({
                            message: "Product created successully",
                            data: _.pick(result, ["name", "description", "price", "category", "quantity"])
                        })
                    }
                })
            })
        }

        // if (feilds.photo) eta jode fail hoy tar mane se kno photo provide kore nai so amar ekhn amar jeta kote hbe seta holo 

        else {
            return res.status(400).send("No Image Provided")
        }

    })
}

module.exports.getProducts = async (req, res) => {

}

module.exports.getProductById = async (req, res) => {

}

module.exports.updateProductById = async (req, res) => {

}