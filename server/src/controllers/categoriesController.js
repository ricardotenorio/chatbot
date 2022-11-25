const categories = require('../models/categories');
const News = require('../models/news');
const { newsToCardResponse } = require('../utils/newsToCardResponse');

module.exports = {
    async index(request, response) {
        return response.json(categories);
    },

    async show(request, response) {
        try {
            const category = request.body.queryResult.queryText.toLowerCase();

            if (!categories.includes(category)) {
                return response.sendStatus(404);
            }

            const newsCollection = await News.find({ category }).sort({ createdAt: -1 }).limit(10);

            const cardsResponse = newsToCardResponse(newsCollection);

            return response.json(cardsResponse);
        } catch (error) {
            console.log(error);

            return response.sendStatus(500);
        }
    },
}