var router = require('express').Router();
var Goal = require('./goalModel');
var lib = require('../lib/lib');

router.get('/', function(req, res) {
    lib.models.getAllItems(Goal, function(err, result) {
        res.json(err || result);
    });
});

router.post('/', function(req, res) {
    var newGoal = new Goal(req.body);

    newGoal.save(function(err, result) {
        res.json(err || result);
    });
});

router.get('/:id', function(req, res) {
    lib.models.getById(Goal, req.params.id, function(err, result) {
        res.json(err || result);
    });
});

router.post('/:id', function(req, res) {
    lib.models.updateItem(Goal, req.params.id, req.body, function(err, result) {
        res.json(err || result);
    });
});

router.delete('/:id', function(req, res) {
    lib.models.deleteItem(Goal, req.params.id, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
