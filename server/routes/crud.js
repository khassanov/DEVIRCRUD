var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var path = require('path');
var isAuthenticated = require('../utils/is_authenticated');
var User = require('../models/User');
var Product = require('../models/Product');
var upload = multer({
    dest: 'public/images/content'
});
var isEmpty = require('../utils/is_empty');


router.get('/', function (req, res, next) {

    Product.find().exec(function (err, products) {
        console.log(products)
        res.status(200).send(products)
    })
})

router.get('/user/:user_id', function (req, res, next) {

    Product.find({
        author: req.params.user_id
    }).exec(function (err, products) {
        if (err) return next(err);
        User.findById(req.params.user_id).exec(function (err, user) {
            if (err) return next(err);
            res.status(200).send({
                products: products,
                author: user
            });
        });

    })
})
router.post('/', isAuthenticated, upload.single('img'), function (req, res, next) {

    console.log(req.body);
    new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        author: req.user,

    }).save(function (err, product) {

        var tempPath;
        if (req.file && req.file.path) {
            tempPath = req.file.path;
        } else {
            tempPath = undefined;
            return
        }

        if (err) {
            return res.status(400).send({
                msg: 'Error not saved'
            });
        }

        var targetPath = path.resolve('public/images/content/' + product._id + '.' + req.file.originalname.split('.').slice(-1).pop());
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                return next(err);
            }
            console.log(err)


            product.img = 'images/content/' + product._id + '.' + req.file.originalname.split('.').slice(-1).pop();
            product.save(function (err, data) {
                if (err) {
                    return res, status(400).send({
                        msg: 'Error not saved'
                    });
                }
                res.status(200).send(data);
            })
        })

    })

})

router.put('/', isAuthenticated, upload.single('img'), function (req, res, next) {


    Product.findById(req.body._id).exec(function (err, product) {

        if (err) {
            return res.status(400).send({
                msg: 'Product not found'
            });
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.price = req.body.price;
        product.save(function (err, product) {
            if (req.file) {
                fs.unlink(path.resolve('public/' + product.img), function (err) {
                    var tempPath = req.file.path;

                    if (err) {
                        return res.status(400).send({
                            msg: 'Error not saved'
                        });
                    }

                    var targetPath = path.resolve('public/images/content/' + Date.now + '.' + req.file.originalname.split('.').slice(-1).pop());

                    fs.rename(tempPath, targetPath, function (err) {
                        if (err) {
                            return next(err);
                        }

                        product.img = 'images/content/' + Date.now + '.' + req.file.originalname.split('.').slice(-1).pop();
                        product.save(function (err, product) {
                            if (err) {
                                return res, status(400).send({
                                    msg: 'Error not saved'
                                });
                            }
                            res.status(200).send(product);
                        })
                    });
                })

            } else {
                res.status(200).send(product);
            }

        })
    })
})

router.delete('/:id', isAuthenticated, function (req, res, next) { //route hello

    Product.deleteOne({
            _id: req.params.id
        })
        .exec(function (err, Dbs) {
            console.log(Dbs)
            if (err) {
                return res.status(400).send({
                    msg: 'not deleted'
                })
            }
            res.status(200).end()
        })

})


router.get('/:id', function (req, res, next) {

    Product.findById(req.params.id).exec(function (err, products) {
        if (err) {
            return res.status(400).send({
                msg: 'Product not found'
            })
        }
        console.log(products)
        res.status(200).send(products)
    })
})



module.exports = router;