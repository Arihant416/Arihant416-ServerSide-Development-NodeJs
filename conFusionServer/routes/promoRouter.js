const express = require("express");
const bodyParser = require("body-parser");
const Promotions = require("../models/promotions");
const promoRouter = express.Router();
var verifyUser = require("../autheticate").verifyUser;
var verifyAdmin = require("../autheticate").verifyAdmin;

promoRouter.use(bodyParser.json());

promoRouter
    .route("/")
    .get((req, res, next) => {
        Promotions.find({})
            .then(
                promotions => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(promotions);
                },
                err => next(err)
            )
            .catch(err => next(err));
    })
    .post(verifyUser, verifyAdmin, (req, res, next) => {
        Promotions.create(req.body)
            .then(
                promo => {
                    console.log("Promotion Created ", promo);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(promo);
                },
                err => next(err)
            )
            .catch(err => next(err));
    })
    .put(verifyUser, verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /promotions");
    })
    .delete(verifyUser, verifyAdmin, (req, res, next) => {
        Promotions.remove({})
            .then(
                resp => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(resp);
                },
                err => next(err)
            )
            .catch(err => next(err));
    });

promoRouter
    .route("/:promoId")
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
            .then(
                promo => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(promo);
                },
                err => next(err)
            )
            .catch(err => next(err));
    })
    .post(verifyUser, verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported on /promotions/" + req.params.promoId);
    })
    .put(verifyUser, verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndUpdate(
            req.params.promoId,
            {
                $set: req.body
            },
            { new: true }
        )
            .then(
                promo => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(promo);
                },
                err => next(err)
            )
            .catch(err => next(err));
    })
    .delete(verifyUser, verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
            .then(
                resp => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(resp);
                },
                err => next(err)
            )
            .catch(err => next(err));
    });

module.exports = promoRouter;