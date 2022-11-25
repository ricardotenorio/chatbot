module.exports = {
    newsToCardResponse(newsCollection) {
        const fullfillment = { fulfillmentMessages: [] }

        if (newsCollection.length === 0) {
            fullfillment.fulfillmentMessages.push({
                text: {
                    text: ['Nenhuma notícia encontrada.'],
                },
            });
        } else {

            const cards = newsCollection.map((news) => {
                return {
                    title: news.title,
                    subtitle: news.description,
                    image_url: news.image_url,
                    buttons: [
                        {
                            postback: news.news_url,
                        }
                    ]
                }
            })

            const cardsResponse = {
                facebook: {
                    attachment: {
                        type: "template",
                        payload: {
                            elements: [
                                cards
                            ],
                            template_type: "generic"
                        }
                    }
                }
            }

            fullfillment.fulfillmentMessages.push(cardsResponse);
        }

        return fullfillment;
    }
}