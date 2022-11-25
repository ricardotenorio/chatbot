const categories = require('../models/categories');
const News = require('../models/news');
const { newsToCardResponse } = require('../utils/newsToCardResponse');

const test = {
    
        facebook: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                {
                  title: "Welcome!",
                  image_url: "https://raw.githubusercontent.com/fbsamples/original-coast-clothing/main/public/styles/male-work.jpg",
                  subtitle: "We have the right hat for everyone.",
                  buttons: [
                    {
                      type: "web_url",
                      url: "https://www.originalcoastclothing.com/",
                      title: "View Website"
                    }
                  ]
                }
              ]
            }
          }
        }
      
}

module.exports = {
    async index(request, response) {
        return response.json(categories);
    },

    async show(request, response) {
        return response.json(test);

        try {
            const category = request.body.queryResult.queryText.toLowerCase();

            // const category = 'esportes';

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