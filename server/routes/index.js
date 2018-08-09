var express = require('express');
var router = express.Router();

router.use(require('./passport'));
router.use('/api/user', require('./user'));
router.use('/api/crud', require('./crud'));

router.get('*', function(req, res, next){

    res.redirect('/#' + req.originalUrl);
})
module.exports = router;
