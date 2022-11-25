module.exports = {
    newsToCardResponse(newsCollection) {
        const fullfillment = { fulfillmentMessages: [] }

        if (newsCollection.length === 0) {
            fullfillment.fulfillmentMessages.push({
                text: {
                    text: ['Nenhuma notícia encontrada.'],
                },
            });

            return fullfillment;
        }

        const cards = newsCollection.map((news) => {
            return {
                title: news.title,
                image_url: news.image_url,
                subtitle: news.description,
                buttons: [
                    {
                        type: 'web_url',
                        url: news.news_url,
                        title: 'Visitar Site'
                    }
                ]
            }
        })

        const cardsResponse = {
            facebook: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: cards
                    }
                }
            }
        }

        // fullfillment.fulfillmentMessages.push(cardsResponse);

        return cardsResponse;
    }
}