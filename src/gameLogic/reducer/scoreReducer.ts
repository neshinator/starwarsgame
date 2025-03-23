import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the slice state
interface ScoreState {
    value: number;
  }

const initialState: ScoreState = {
    value: 0
};


export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        reset: (state) => {
            state.value = 0
        },
        addAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export const { reset, addAmount } = scoreSlice.actions

export default scoreSlice.reducer