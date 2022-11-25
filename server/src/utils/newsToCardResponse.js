module.exports = {
    newsToCardResponse(newsCollection) {
        const fulfillment = { fulfillmentMessages: [] }

        if (newsCollection.length === 0) {
            fulfillment.fulfillmentMessages.push({
                quickReplies: {
                    title: "Nenhuma notícia encontrada, selecione outro tema.",
                    quickReplies: [
                        "Esportes",
                        "Política",
                        "Entretenimento",
                        "Famosos"
                    ]
                },
            });

            return fulfillment;
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
            payload: {
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
        }

        fulfillment.fulfillmentMessages.push(cardsResponse);

        return fulfillment;
    }
}