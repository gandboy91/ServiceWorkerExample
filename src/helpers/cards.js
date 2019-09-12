export const getPreparedCards = cardsCollection => cardsCollection.reduce((acc, card) => {
    const { id, title, content: text, total_likes: likes } = card
    if (!id) {
        return acc
    }
    acc[id] = { id, title, text, likes }
    return acc
}, {})