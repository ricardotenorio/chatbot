const News = require("../models/news");

module.exports = {
    async index(request, response) {
        try {
            const newsCollection = await News.find();

            return response.json({ newsCollection });
        } catch (error) {
            console.log(error);

            return response.sendStatus(500);
        }
    },

    async show(request, response) {
        try {
            const news = await News.findOne({ _id: request.params.id });

            if (!news) {
                return response.sendStatus(404);
            }

            return response.json({ news });
        } catch (error) {
            console.log(error);

            return response.sendStatus(500);
        }
    },

    async store(request, response) {
        try {
            const news = await News.create({ ...request.body });

            return response.status(201).json({ news });
        } catch (error) {
            console.log(error);

            if (error.name === 'ValidationError') {
                return response.sendStatus(400);
            }

            return response.sendStatus(500);
        }
    },

    async update(request, response) {
        try {
            const news = await News.findByIdAndUpdate(request.params.id, {
              ...request.body,  
            }, { new: true });

            if (!news) {
                return response.sendStatus(404);
            }

            return response.json({ news });
        } catch (error) {
            console.log(error);

            if (error.name === 'ValidationError') {
                return response.sendStatus(400);
            }

            return response.sendStatus(500);
        }
    },

    async destroy(request, response) {
        try {
            const news = await News.findOneAndDelete({ _id: request.params.id });

            return response.json({ news });
        } catch (error) {
            console.log(error);

            return response.sendStatus(500);
        }
    },
}