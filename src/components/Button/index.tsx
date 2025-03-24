import {IButtonProps} from './Button.types'
import './Button.style.scss'

/** #### Button
* - A description of the Button component so that tooltips can understand this component
 */
const Button = ({buttonText, size = 'regular',  ...htmlAttributes}: IButtonProps) => {
    return <button className={`Button size-${size}`} {...htmlAttributes}>{buttonText}</button>
}

export default Button