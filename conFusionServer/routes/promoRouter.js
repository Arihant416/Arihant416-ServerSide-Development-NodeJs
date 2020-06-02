const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Promos = require('../models/promotions');
const promoRouter = express.Router();
const authenticate = require('../autheticate');
promoRouter.use(bodyParser.json());

promoRouter
    .route('/')
    .get(function (req, res, next) {
        Promos.find({})
            .then(
                (promos) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promos);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser, function (req, res, next) {
        Promos.create(req.body)
            .then(
                (promo) => {
                    console.log('Promotion Created ', promo);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promo);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /promotions');
    })

    .delete(authenticate.verifyUser, function (req, res, next) {
        Promos.remove({})
            .then(
                (resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    });

promoRouter
    .route('/:promoId')
    .get((req, res, next) => {
        Promos.findById(req.params.promoId)
            .then(
                (promo) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promo);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, function (req, res, next) {
        res.statusCode = 403;
        res.end(
            'Post operation not supported on /promotions/' + req.params.promoId
        );
    })
    .put(authenticate.verifyUser, function (req, res, next) {
        Promos.findByIdAndUpdate(
            req.params.promoId,
            { $set: req.body },
            { new: true }
        )
            .then(
                (promo) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promo);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser, function (req, res, next) {
        Promos.findByIdAndRemove(req.params.promoId)
            .then(
                (resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    });

module.exports = promoRouter;
