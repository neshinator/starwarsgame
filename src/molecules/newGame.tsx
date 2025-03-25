import Button from "../components/Button"
import {useDispatch} from 'react-redux'
import { start, quit } from "../gameLogic/reducer/isPlayingReducer"
import { reset as resetScore } from "../gameLogic/reducer/scoreReducer"
import { reset as resetLevel } from "../gameLogic/reducer/levelReducer"
import Logo from "../components/Logo"

const NewGame = () => {
    const dispatch = useDispatch()

    return <div>
        <Logo width={30} />
        <h1>Probably the best star wars game ever*</h1>
        <p>Welcome intrepid hero and take the ulimate test to determine whether you are worthy.</p>
        <p>But beware! Fail and you will succumb to the dark side...</p>
        <Button data-testid='start' buttonText='Start new game' onClick={() => {
            dispatch(resetLevel())
            dispatch(resetScore())
            dispatch(quit())
            dispatch(start())
        }} />
        <span style={{position: 'absolute', bottom: 0, left: 0, padding: '1rem', fontSize: '0.7rem'}}>* eat your heart out EA</span>
    </div>
}

export default NewGame