var express = require('express');
var router = express.Router();

/*route middleware*/
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.get('/', function (req, res) {
    res.json({data: "get in / route"});
});


module.exports = router;