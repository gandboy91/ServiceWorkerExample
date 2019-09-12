import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import PreviewCardContainer from "../containers/PreviewCardContainer"
import { Link } from 'react-router-dom'
import '../styles/cards.css'
import '../styles/buttons.css'


const AddButton = props => <Link className='addButton previewCard shadow' to={'/cards/new'}>
    +
</Link>

/**
 * List of card previews and adding new card button. Uses likes context
 * @type {{compare, $$typeof, type}}
 */
const CardList = React.memo(({ cardsIds = [] }) => {
    return <div className='cardList'>
        {
            cardsIds.map(
                id => <PreviewCardContainer key={id}
                    cardId={id}
                />
            )
        }
        <AddButton />
    </div>
})

CardList.propTypes = {
    cardsIds: PropTypes.PropTypes.arrayOf(PropTypes.number),
}

export default CardList;
