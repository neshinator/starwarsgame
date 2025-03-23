import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TLevel = {
    question: string;
    allAnswers: string[],
    correctAnswer: number,
    userAnswer: number | null
}

// Define the type for the slice state
interface ScoreState {
    value: TLevel[];
  }

const initialState: ScoreState = {
    value: []
};


export const levelSlice = createSlice({
    name: 'level',
    initialState,
    reducers: {
        reset: (state) => {
            state.value = []
        },
        nextLevel: (state, action: PayloadAction<Omit<TLevel, 'userAnswer'>>) => {
            // this isn't questions at all but rather 'possible answers'
            const {allAnswers, question, correctAnswer} = action.payload
            const newLevel = {
                question,
                allAnswers, 
                correctAnswer, 
                userAnswer: null
            }
            state.value.push(newLevel)
        },
        answerQuestion: (state, action: PayloadAction<number>) => {
            if (state.value.length > 0) {
                state.value[state.value.length - 1].userAnswer = action.payload;
            }
        }
    }
})

export const { reset, nextLevel, answerQuestion } = levelSlice.actions

export default levelSlice.reducer