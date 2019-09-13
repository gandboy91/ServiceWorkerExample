import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import {
    MAX_TITLE_LENGTH,
    MAX_TEXT_LENGTH,
    validateTitle,
    validateText,
    TITLE_ERROR_MESSAGE,
    TEXT_ERROR_MESSAGE
} from "../constants/validation"
import useCard from "../hooks/useCard"
import useValidation from "../hooks/useValidation"
import Validator from "../validators/Validator"
import Title from "./Title"
import {InputWithAlerts, TextareaWithAlerts} from "./forms/inputs"

/**
 * New Card component. Allows to edit card information and save card. Takes save callback
 * Uses card hook and validation hook. Receives as a prop validators object with specific validator for each field
 * when complete redirects to main page
 */
const NewCard = ({ addCardRequest, fieldsValidators }) => {
    const { title, text, complete, setComplete, changeTextHandler, changeTitleHandler } = useCard()
    const { invalidFields, validate } = useValidation(fieldsValidators)

    const getError = useCallback(field => invalidFields[field] || '', [invalidFields])
    const saveHandler = useCallback(() => {
       if (validate({ title, text })) {
           addCardRequest({
               card: { title, content: text },
               onSuccess: setComplete
           })
       }
    },[title, text])

    return complete
        ? <Redirect to='/' />
        : <div>
            <Title>New Card</Title>
            <div className='card newCard shadow'>
                <div className="card-header">
                    <InputWithAlerts value={title}
                        placeholder='Enter title'
                        maxLength={MAX_TITLE_LENGTH}
                        onChange={changeTitleHandler}
                        error={getError('title')}
                    />
                </div>
                <div className="card-body">
                    <TextareaWithAlerts value={text}
                        placeholder='Enter text'
                        maxLength={MAX_TEXT_LENGTH}
                        onChange={changeTextHandler}
                        error={getError('text')}
                    />
                    <button type="button" className="btn btn-lg btn-secondary mt-3 btn-block" onClick={saveHandler}>
                        Save
                    </button>
                </div>
            </div>
        </div>
}

NewCard.defaultProps = {
    fieldsValidators: {
        'title': new Validator(validateTitle, TITLE_ERROR_MESSAGE),
        'text': new Validator(validateText, TEXT_ERROR_MESSAGE)
    }
}

NewCard.propTypes = {
    addCardRequest: PropTypes.func.isRequired,
    fieldsValidators: PropTypes.objectOf(PropTypes.instanceOf(Validator))
}

export default React.memo(NewCard)
