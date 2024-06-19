
const express = require('express');
const router = express.Router();

/* GET logout route. */
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;
