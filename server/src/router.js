const { Router } = require('express');
const auth = require('./middlewares/auth');
const authController = require('./controllers/authController');
const categoriesController = require('./controllers/categoriesController');
const newsController = require('./controllers/newsController');

const router = Router();

// auth
router.post('/login', authController.login);
router.post('/auth', auth, authController.verifyAuth);

// categories
router.get('/categories', auth, categoriesController.index);
router.get('/categories/:category', categoriesController.show);

// news
router.get('/news', auth, newsController.index);
router.get('/news/:id', auth, newsController.show);
router.post('/news', auth, newsController.store);
router.patch('/news/:id', auth, newsController.update);
router.delete('/news/:id', auth, newsController.destroy);

router.get('/', auth, (request, response) => {
    response.send('<h1>hello</h1>');
});

module.exports = router;