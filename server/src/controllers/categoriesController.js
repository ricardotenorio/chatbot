const categories = require('../models/categories');
const News = require('../models/news');

module.exports = {
    async index(request, response) {
        return response.json({ categories });
    },

    async show(request, response) {
        const category = request.params.category.toLowerCase();

        if (!categories.includes(category)) {
            return response.sendStatus(404);
        }

        try {
            const newsCollection = await News.find({ category }).sort({ createdAt: -1 }).limit(10);

            return response.json({ newsCollection });
        } catch (error) {
            console.log(error);

            return response.sendStatus(500);
        }
    },
}