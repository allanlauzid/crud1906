
var express = require('express');
var router = express.Router();

/* GET logout route. */
router.get('/logout', function(req, res) {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;
