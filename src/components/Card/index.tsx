import {ICardProps} from './Card.types'
import './Card.style.scss'

/** #### Card
* - A description of the Card component so that tooltips can understand this component
 */
const Card = ({question, isSelected, ...htmlAttributes}: ICardProps) => {
    return <div className='Card' {...htmlAttributes}>{question} {isSelected && <span>X</span>}</div>
}

export default Card