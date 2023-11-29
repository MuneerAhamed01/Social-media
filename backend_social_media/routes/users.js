const express = require('express');
const { register, login, logout } = require('../controllers/auth');

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Hello from users.js')
})

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

module.exports = router;