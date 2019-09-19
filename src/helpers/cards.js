export const getPreparedCards = cardsCollection => cardsCollection.reduce((acc, card) => {
    const preparedCard = getPreparedCard(card)
    return preparedCard
        ? { ...acc, [preparedCard.id]: preparedCard }
        : acc
}, {})

export const getPreparedCard = (card = {}) => {
    if (!Object.keys(card).length || !card.id) {
        return null
    }
    const { id, title, content: text, total_likes: likes } = card
    return { id, title, text, likes }
}
