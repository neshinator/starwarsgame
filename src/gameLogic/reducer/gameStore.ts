import {configureStore} from '@reduxjs/toolkit'
import scoreReducer from './scoreReducer'
import isPlayingReducer from './isPlayingReducer'
import levelReducer from './levelReducer'

export const store = configureStore({
    reducer: {
        score: scoreReducer,
        isPlaying: isPlayingReducer,
        level: levelReducer
    }
})

export type TGameStore = ReturnType<typeof store.getState>
