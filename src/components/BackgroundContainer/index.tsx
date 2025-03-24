import {IBackgroundContainerProps} from './BackgroundContainer.types'
import './BackgroundContainer.style.scss'
import Logo from '../Logo'

/** #### BackgroundContainer
* - A description of the BackgroundContainer component so that tooltips can understand this component
 */
const BackgroundContainer = ({children, ...htmlAttributes}: IBackgroundContainerProps) => {
    return <div className="BackgroundContainer" {...htmlAttributes}>
        <div className='GameContainer'>
            <Logo width={30} />
            {children}
        </div>
    </div>
}

export default BackgroundContainer