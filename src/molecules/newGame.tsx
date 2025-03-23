import Button from "../components/Button"
import {useDispatch} from 'react-redux'
import { start, quit } from "../gameLogic/reducer/isPlayingReducer"
import { reset as resetScore } from "../gameLogic/reducer/scoreReducer"
import { reset as resetLevel } from "../gameLogic/reducer/levelReducer"

const NewGame = () => {
    const dispatch = useDispatch()

    return <div>New Game
        <Button buttonText='Start new game' onClick={() => {
            
            dispatch(resetLevel())
                            dispatch(resetScore())
                            dispatch(quit())
            dispatch(start())
        }} />
    </div>
}

export default NewGame