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
                subtitle: news.description,
                image_url: news.image_url,
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
                        elements: cards,
                        template_type: "generic"
                    }
                }
            }
        }

        fullfillment.fulfillmentMessages.push(cardsResponse);

        return fullfillment;
    }
}