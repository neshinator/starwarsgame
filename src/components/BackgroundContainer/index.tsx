import {IBackgroundContainerProps} from './BackgroundContainer.types'
import './BackgroundContainer.style.scss'

/** #### BackgroundContainer
* - A description of the BackgroundContainer component so that tooltips can understand this component
 */
const BackgroundContainer = ({children, ...htmlAttributes}: IBackgroundContainerProps) => {
    return <div className="BackgroundContainer" {...htmlAttributes}>
        <div className='GameContainer'>
            {children}
        </div>
    </div>
}

export default BackgroundContainer