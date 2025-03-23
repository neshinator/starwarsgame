import {ICardProps} from './Card.types'
import './Card.style.scss'

/** #### Card
* - A description of the Card component so that tooltips can understand this component
 */
const Card = ({...htmlAttributes}: ICardProps) => {
    return <div {...htmlAttributes}>Card</div>
}

export default Card