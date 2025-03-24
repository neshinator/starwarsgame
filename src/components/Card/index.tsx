import {ICardProps} from './Card.types'
import './Card.style.scss'

/** #### Card
* - A description of the Card component so that tooltips can understand this component
 */
const Card = ({question, isSelected, ...htmlAttributes}: ICardProps) => {
    let isSelectedClass = ''
    if (isSelected !== null){
        isSelectedClass = `${isSelected ? 'is' : 'isNot'}Selected`
    }
    
    return <div className={`Card ${isSelectedClass}`} {...htmlAttributes}><h3>{question}</h3></div>
}

export default Card