const { Router } = require('express');
const auth = require('./middlewares/auth');
const authController = require('./controllers/authController');

const router = Router();

router.post('/login', authController.login);
router.post('/auth', auth, authController.verifyAuth);

router.get('/', auth, (request, response) => {
    response.send('<h1>hello</h1>');
});

module.exports = router;