import {configureStore} from '@reduxjs/toolkit'
import scoreReducer from './scoreReducer'
import isPlayingReducer from './isPlayingReducer'
import levelReducer from './levelReducer'

export default configureStore({
    reducer: {
        score: scoreReducer,
        isPlaying: isPlayingReducer,
        level: levelReducer
    }
})