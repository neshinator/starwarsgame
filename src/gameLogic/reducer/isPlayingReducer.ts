import { createSlice } from "@reduxjs/toolkit";

// Define the type for the slice state
interface ScoreState {
    value: boolean;
  }

const initialState: ScoreState = {
    value: false
};


export const playingSlice = createSlice({
    name: 'isPlaying',
    initialState,
    reducers: {
        quit: (state) => {
            state.value = false
        },
        start: state => {
            state.value = true
        }
    }
})

export const { quit, start } = playingSlice.actions

export default playingSlice.reducer