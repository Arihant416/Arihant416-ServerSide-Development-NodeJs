const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Leaders = require('../models/leaders'),
    leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
    .route('/')
    .get(function (req, res, next) {
        Leaders.find({})
            .then(
                (leaders) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leaders);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .post(function (req, res, next) {
        Leaders.create(req.body)
            .then(
                (leader) => {
                    console.log('Leader Created ', leader);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /leaders');
    })
    .delete((req, res, next) => {
        Leaders.remove({})
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

leaderRouter
    .route('/:leaderId')
    .get(function (req, res, next) {
        Leaders.findById(req.params.leaderId)
            .then(
                (leader) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .post(function (req, res, next) {
        res.statusCode = 403;
        res.end(
            'Post operation not supported on /leaders/' + req.params.leaderId
        );
    })
    .put(function (req, res, next) {
        Leaders.findByIdAndUpdate(
            req.params.leaderId,
            {
                $set: req.body,
            },
            { new: true }
        )
            .then(
                (leader) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .delete(function (req, res, next) {
        Leaders.findByIdAndRemove(req.params.leaderId)
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

module.exports = leaderRouter;
