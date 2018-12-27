var express          = require('express');
var router           = express.Router();

/**
* API end point to user
*/
router.get('/',function(req, res, next){
    res.send("Server is running.");
});
module.exports = router;