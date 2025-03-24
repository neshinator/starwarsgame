import { IFilmData } from "../hooks/useFilmData"
import { useSelector } from "react-redux"
import { useCallback, useEffect, useRef, useState } from "react"
import {useDispatch} from 'react-redux'
import { TLevel } from "../gameLogic/reducer/levelReducer"
import { nextLevel, answerQuestion, reset as resetLevel } from "../gameLogic/reducer/levelReducer"
import { reset as resetScore, addAmount } from "../gameLogic/reducer/scoreReducer"
import { quit } from "../gameLogic/reducer/isPlayingReducer"
import Card from "../components/Card"
import Button from "../components/Button"
import { FilmQA } from "../gameLogic/filmQA"
import Logo from "../components/Logo"

type TGameQuestions = {
    question: string;
    correct: string;
    incorrect: string[]
}

const generateLevel = (index: number, gameQuestions: TGameQuestions[]) => {
    const question = gameQuestions[index]
    const allAnswers = question.incorrect.concat([question.correct]).sort(() => Math.random() - 0.5)
    return {
        question: question.question,
        allAnswers: allAnswers,
        correctAnswer: allAnswers.findIndex(answer => answer === question.correct)
    }
}

const Level = ({films}: {films: IFilmData[]}) => {
    //to tackle the weird component mount twice issue when running in debug
    const hasDispatched = useRef(false);

    const [userAnswer, setUserAnswer] = useState<number | null>(null)
    const [userConfirm, setUserConfirm] = useState<boolean>(false)
    const [qa, setQa] = useState<FilmQA | null>(null)
    const levels = useSelector((state) => state.level.value)
    const score = useSelector(state => state.score.value)
    const dispatch = useDispatch()
    const latestLevel: TLevel = levels.length ? levels[levels.length - 1] : null

    const [gameQuestions, setGameQuestions] = useState<TGameQuestions[] | null>(null)


    useEffect(() => {
        if (films.length && levels.length === 0 && !hasDispatched.current){
            hasDispatched.current = true

            const qa = new FilmQA(films)
            setQa(qa)
            const questions = qa.getQuestions()
            const levels = questions.map(q => {
                const answers = qa.getAnswers(q)
                return {
                    question: q,
                    correct: answers.correct,
                    incorrect: answers.incorrect
                }
            })

            setGameQuestions(levels)

            setUserAnswer(null)
            setUserConfirm(false)

            const newLevel = generateLevel(0, levels)
            dispatch(nextLevel(newLevel))
        }
    }, [levels, films, dispatch, qa])

    // set user answer
    useEffect(() => {
        if (userAnswer !== null){
            dispatch(answerQuestion(userAnswer))
        }
    }, [userAnswer, dispatch])

    //set a new level once user confirms
    const setNewLevel = useCallback((level: number) => {
        setUserAnswer(null)
        setUserConfirm(false)
        const newLevel = generateLevel(level + 1, gameQuestions as TGameQuestions[])
        dispatch(nextLevel(newLevel))
    }, [ dispatch, gameQuestions])

    //set a new score if correct
    const scoreAnswer = useCallback(() => {
        const isCorrect = latestLevel.correctAnswer === latestLevel.userAnswer
        if (isCorrect){
            dispatch(addAmount(10))
        }
    }, [latestLevel, dispatch])

    let isCorrect = false
    if (userConfirm) {
        isCorrect = latestLevel.correctAnswer === latestLevel.userAnswer
    }

    if (!films) {
        return null
    }

    return <div>

            {/** Menu - painted myself into a corner here but this should be a separate component */}
            <div style={{display: 'flex'}}>
                <div style={{paddingTop: '2rem'}}>
                    <div>Level {levels.length}</div>
                    <div>Score: {score}</div>
                </div>
                <div style={{flexGrow: 1}}><Logo width={20} /></div>
                <div style={{paddingTop: '2rem'}}>
                    <Button  size="small" buttonText="Quit" onClick={() => {
                        setUserAnswer(null)
                        setUserConfirm(false)

                        dispatch(resetLevel())
                        dispatch(resetScore())
                        dispatch(quit())
                    }} />
                </div>
            </div>

        <div>
            <h2>{latestLevel?.question}</h2>
            {latestLevel?.allAnswers.map((question, index) => <Card key={index} isSelected={userAnswer === index} question={question} onClick={() => setUserAnswer(index)} />)}
        </div>

        {latestLevel && latestLevel.userAnswer !== null && !userConfirm && <div>
            <Button buttonText="Are you sure?" onClick={() => {
                setUserConfirm(true)
                scoreAnswer()
            }} />
        </div>}
        
        {userConfirm && <div>
            <div>{isCorrect ? 'Yo! You are the jedi' : 'Oh no! you are a clutz'}
                <p>The correct answer is {latestLevel.allAnswers[latestLevel.correctAnswer]}</p>
            </div>
            <Button buttonText="Go to next level" onClick={() => setNewLevel(levels.length + 1)} />
        </div>}
    </div>
}

export default Level