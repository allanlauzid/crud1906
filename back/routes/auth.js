
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');

// Endpoint para login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(401).send({ error: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).send({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
