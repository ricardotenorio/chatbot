module.exports = {
    newsToCardResponse(newsCollection) {
        if (newsCollection.length === 0) {
            return {};
        }

        const cards = newsCollection.map((news) => {
            return {
                title: news.title,
                subtitle: news.description,
                image_url: news.image_url,
                buttons: [
                    {
                        url: news.news_url
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

        return cardsResponse;
    }
}