import {ICardProps} from './Card.types'
import './Card.style.scss'

/** #### Card
* - A description of the Card component so that tooltips can understand this component
 */
const Card = ({question, ...htmlAttributes}: ICardProps) => {
    return <div className='Card' {...htmlAttributes}>{question}</div>
}

export default Card