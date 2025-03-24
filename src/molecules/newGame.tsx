import Button from "../components/Button"
import {useDispatch} from 'react-redux'
import { start, quit } from "../gameLogic/reducer/isPlayingReducer"
import { reset as resetScore } from "../gameLogic/reducer/scoreReducer"
import { reset as resetLevel } from "../gameLogic/reducer/levelReducer"

const NewGame = () => {
    const dispatch = useDispatch()

    return <div>
        <h1>Probably the best star wars game ever</h1>
        <p>Welcome intrepid hero and take the ulimate test to determine whether you are worthy.</p>
        <p>But beware! Fail and you will succumb to the dark side...</p>
        <Button buttonText='Start new game' onClick={() => {
            dispatch(resetLevel())
            dispatch(resetScore())
            dispatch(quit())
            dispatch(start())
        }} />
    </div>
}

export default NewGame