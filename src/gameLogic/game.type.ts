type TGameQuestion = {
    type: 'film' | 'planet' | 'character'
}

export interface IGameData {
    level: number;
    questionType: TGameQuestion,
    score: number;
}