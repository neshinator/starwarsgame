import {IButtonProps} from './Button.types'
import './Button.style.scss'

/** #### Button
* - A description of the Button component so that tooltips can understand this component
 */
const Button = ({buttonText, ...htmlAttributes}: IButtonProps) => {
    return <button {...htmlAttributes}>{buttonText}</button>
}

export default Button