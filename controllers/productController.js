const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { Product, validate } = require('../models/product');

module.exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
        if (err) return res.status(400).send("Something went wrong!");

        // Convert fields to the appropriate types and ensure they are strings
        const processedFields = {
            name: String(fields.name),
            description: String(fields.description),
            price: parseFloat(fields.price),
            category: String(fields.category),
            quantity: parseInt(fields.quantity, 10)
        };

        // Validate the fields
        const { error } = validate(processedFields);
        if (error) return res.status(400).send(error.details[0].message);

        const product = new Product(processedFields);
        product.save()
            .then(result => {
                return res.status(201).send({
                    message: "Product Created Successfully!",
                    data: _.pick(result, ["name", "description", "price", "category", "quantity"])
                });
            })
            .catch(err => {
                return res.status(500).send("Internal Server error!");
            });
    });
}

// Query String
// api/product?order=desc&sortBy=name&limit=10
module.exports.getProducts = async (req, res) => {
    console.log(req.query)
    let order = req.query.order === 'desc' ? -1 : 1;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const products = await Product.find().select({ photo: 0 }).sort({ [sortBy]: order }).limit(limit).populate('category', "name");
    return res.status(200).send(products)
}

module.exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
        .select({ photo: 0 })
        .populate('category', 'name');
    if (!product) res.status(404).send("Not Found!");
    return res.status(200).send(product);
}

// I will not use This api now ...
module.exports.getPhoto = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
        .select({ photo: 1, _id: 0 })
    res.set('Content-Type', product.photo.contentType);
    return res.status(200).send(product.photo.data);
}

// Get Product by Id
// Collect form data
// Update Provied Form Fields
// Update photo (If Provided)

module.exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        const form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Form parsing error:", err);
                return res.status(400).send("Something went wrong during form parsing!");
            }

            console.log("Parsed fields:", fields);
            console.log("Parsed files:", files);

            // Convert numeric fields to numbers
            if (fields.price) fields.price = parseFloat(fields.price);
            if (fields.quantity) fields.quantity = parseInt(fields.quantity, 10);

            const updatedFields = _.pick(fields, ["name", "description", "price", "category", "quantity"]);

            // Validate the updated fields using Joi
            const { error } = validate(updatedFields);
            if (error) {
                return res.status(400).send(`Validation error: ${error.details[0].message}`);
            }

            _.assignIn(product, updatedFields);

            if (files.photo) {
                try {
                    const data = await fs.promises.readFile(files.photo.path);
                    product.photo.data = data;
                    product.photo.contentType = files.photo.type;
                } catch (readErr) {
                    console.error("File reading error:", readErr);
                    return res.status(400).send("Something went wrong while reading the file!");
                }
            }

            try {
                await product.save();
                res.status(200).send({ message: "Product Updated Successfully!" });
            } catch (saveErr) {
                console.error("Product saving error:", saveErr);
                res.status(500).send(`Something failed during product saving: ${saveErr.message}`);
            }
        });
    } catch (findErr) {
        console.error("Product finding error:", findErr);
        res.status(500).send("Something went wrong while finding the product!");
    }
};

// Filter by any Feilds 
module.exports.filterProducts = async (req, res) => {

    let order = req.body.order === 'desc' ? -1 : 1;
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = parseInt(req.body.skip)
    // filters object take collect korbo karon er modhe sob thakbe ..
    let filters = req.body.filters
    let args = {}
    // ekta empty object crete krobo
    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === "price") {
                args['price'] = {
                    $gte: filters['price'][0],
                    $lte: filters['price'][1] // Assuming filters['price'] is an array with two elements [minPrice, maxPrice]
                };
                console.log(args)
            }
            if (key === "category") {
                args['category'] = {
                    $in: filters['category'] // Assuming filters['category'] is an array of categories
                };
            }
        }
    }

    const products = await Product.find(args).select({ photo: 0 }).populate('category', 'name').sort({ [sortBy]: order }).skip(skip).limit(limit)
    return res.status(200).send(products)
}


