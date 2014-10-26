var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/cpu', function(req, res) {
    var db = req.db;
    db.collection('cpu').find().sort({ createdAt: -1 }).limit(500).toArray(function(err, items) {
        items = items.reverse();

        var data = {
            labels: items.map(function(item) { return item.createdAt.toLocaleDateString() + ", " + item.createdAt.toLocaleTimeString() }),
            datasets: [{
                label: "CPU Times",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: items.map(function(item) { return item.value })}
            ]
        };

        res.render('charts/cpu', { title: 'CPU', chartData: JSON.stringify(data) });
    });
});

router.get('/la', function(req, res) {
    var db = req.db;
    db.collection('la').find().sort({ createdAt: -1 }).limit(500).toArray(function(err, items) {
        items = items.reverse();

        var data = {
            labels: items.map(function(item) { return item.createdAt.toLocaleDateString() + ", " + item.createdAt.toLocaleTimeString() }),
            datasets: [{
                label: "CPU Times",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: items.map(function(item) { return item.value })}
            ]
        };

        res.render('charts/la', { title: 'Load Averages [1 minute]', chartData: JSON.stringify(data) });
    });
});

router.get('/mem', function(req, res) {
    var db = req.db;
    db.collection('mem').find().sort({ createdAt: -1 }).limit(500).toArray(function(err, items) {
        items = items.reverse();

        var data = {
            labels: items.map(function(item) { return item.createdAt.toLocaleDateString() + ", " + item.createdAt.toLocaleTimeString() }),
            datasets: [{
                label: "CPU Times",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: items.map(function(item) { return item.value })}
            ]
        };

        res.render('charts/mem', { title: 'Memory Usage [free memory]', chartData: JSON.stringify(data) });
    });
});

router.get('/disk', function(req, res) {
    var db = req.db;
    db.collection('disk').find().sort({ createdAt: -1 }).limit(500).toArray(function(err, items) {
        items = items.reverse();

        var data = {
            labels: items.map(function(item) { return item.createdAt.toLocaleDateString() + ", " + item.createdAt.toLocaleTimeString() }),
            datasets: [{
                label: "Disk Usage",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: items.map(function(item) { return item.value })}
            ]
        };

        res.render('charts/disk', { title: 'Disk Usage [free space]', chartData: JSON.stringify(data) });
    });
});


module.exports = router;
