var express = require('express');
var router = express.Router();
var User = require('../models/User');
var validator = require('validator');
var isEmpty = require('../utils/is_empty');
var passport = require('passport');

router.post('/signup', function (req, res, next) {

    var errors = {};

    if (isEmpty(req.body.email)) {

        errors.email = 'Введите свой Email';

    } else if (!validator.isEmail(req.body.email)) {

        errors.email = 'Неверный форма email';
    }

    if (isEmpty(req.body.first_name)) {
        errors.firstName = 'Введите имя';
    }
    if (isEmpty(req.body.last_name)) {
        errors.lastName = 'Введите фамилию';
    }

    if (isEmpty(req.body.password)) {
        errors.password = 'Введите пароль';
    } else if (!validator.isLength(req.body.password, {
            min: 6,
            max: 30
        })) {

        errors.password = 'Длинна пароля должна быть от 6 до 30 символов';
    }

    if (isEmpty(req.body.password2)) {
        errors.password2 = 'Введите пароль еще раз';
    } else if (req.body.password !== req.body.password2) {

        errors.password2 = 'Пароли не совпадают';
    }

    if (isEmpty(errors)) {

        console.log(req.body);
        new User({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        }).save(function (err, user) {
            console.log(req.body);
            if (err) {
                return res.status(400).send({
                    msg: 'Ошибка обратитесь в службу поддержки'
                });
            }
            res.status(200).send(User);

        })

    } else {

        res.status(400).send(errors);
    }
})


router.post('/login', function (req, res, next) {

    var errors = {};

    if (isEmpty(req.body.email)) {
        errors.email = 'Введите e-mail';
    } else if (!validator.isEmail(req.body.email)) {

        errors.email = 'Неверный форма e-mail';
    }

    if (isEmpty(req.body.password)) {
        errors.password = 'Введите пароль';
    }
    if (!isEmpty(errors)) {
        res.status(400).send(errors);
    } else {
        next();
    }


}, passport.authenticate('local'), function (req, res, next) {

    res.status(200).send({
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        _id: req.user._id,
    });
})


router.get('/current', function (req, res, next) {

    if (req.user) {
        res.status(200).send({
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            _id: req.user._id,
        });

    } else {
        res.status(200).send(undefined);
    }
})

router.post('/logout', function (req, res) {

    req.logout();
    res.sendStatus(200).end();
})


module.exports = router;