
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('layout', { body: 'pages/login', title: 'Express', error: '' });
});

/* POST login data. */
router.post('/login', function(req, res) {
    const { username, password } = req.body;
    fetch('http://localhost:3001/auth/login', { // Certifique-se de que a URL está correta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            document.cookie = `token=${data.token}; path=/`;
            res.redirect('/users');
        } else {
            res.render('layout', { body: 'pages/login', title: 'Express', error: data.error });
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        res.render('layout', { body: 'pages/login', title: 'Express', error: 'Erro ao fazer login' });
    });
});

module.exports = router;
