import React, { useState, useCallback } from 'react'
import {EMPTY_CARD} from "../constants/cards"

/**
 * Card hook. Manages card state. Allows to change text, title, complete flag.
 * Adapted for usage with inputs (some callbacks take event as argument)
 * @param defaultCard
 * @returns {object}
 */
export default function useCard(defaultCard = EMPTY_CARD) {
    const [complete, setComplete] = useState(false)
    const [title, setTitle] = useState(defaultCard.title)
    const [text, setText] = useState(defaultCard.text)

    return {
        text,
        title,
        complete,
        changeTextHandler: useCallback(({ target: { value } }) => setText(value), []),
        changeTitleHandler: useCallback(({ target: { value } }) => setTitle(value), []),
        setComplete: useCallback(setComplete, [])
    }
}