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
import useIsMobile from "../hooks/useIsMobile"
import Modal from "../components/Modal"
import { TGameStore } from "../gameLogic/reducer/gameStore"

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

    const isMobile = useIsMobile()

    const [userAnswer, setUserAnswer] = useState<number | null>(null)
    const [userConfirm, setUserConfirm] = useState<boolean>(false)
    const [qa, setQa] = useState<FilmQA | null>(null)
    const levels = useSelector((state: TGameStore) => state.level.value)
    const score = useSelector((state: TGameStore) => state.score.value)
    const dispatch = useDispatch()
    const latestLevel: TLevel | null = levels.length ? levels[levels.length - 1] : null

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
        const isCorrect = latestLevel?.correctAnswer === latestLevel?.userAnswer
        if (isCorrect){
            dispatch(addAmount(10))
        }
    }, [latestLevel, dispatch])

    let isCorrect = false
    if (userConfirm) {
        isCorrect = latestLevel?.correctAnswer === latestLevel?.userAnswer
    }

    if (!films) {
        return null
    }

    const returnScoreText = () => {
        switch(score){
            case 50:
            case 40:
                return <p>Those are some serious skills Master Jedi</p>
            case 30:
                return <p>You've got potential there novice! Continue honing those skills...</p>
            case 20:
                return <p>Not everyone can be a Jedi. There's droid work as well...</p>
            case 10:
                return <p>Best leave Jedi business to the pro's</p>
            case 0:
            default:
                return <p>Well really! It looks like you've been living under a rock for the past few decades</p>
        }
    }

    if (levels.length > 5){
        return <div>
            <Logo width={20} />
            <h2>You scored {score} out of 50</h2>
            {returnScoreText()}

            <Button  size="regular" buttonText="Finish" onClick={() => {
                setUserAnswer(null)
                setUserConfirm(false)

                dispatch(resetLevel())
                dispatch(resetScore())
                dispatch(quit())
            }} />
        </div>
    }

    return <div>

            {/** Menu - painted myself into a corner here but this should be a separate component */}
            <div style={{display: 'flex'}}>
                <div style={{paddingTop: '2rem', minWidth: '100px'}}>
                    <div>Level {levels.length}</div>
                    <div>Score: {score}</div>
                </div>
                <div style={{flexGrow: 1}}><Logo width={20} /></div>
                <div style={{paddingTop: '2rem', minWidth: '100px'}}>
                    <Button data-testid='quit' size="small" buttonText="Quit" onClick={() => {
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
            <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexGrow: 1}}>
                {latestLevel?.allAnswers.map((question, index) => <Card data-testid={`card-${index + 1}`} key={index} isSelected={latestLevel?.userAnswer !== null ? latestLevel.userAnswer === index : null} question={question} onClick={() => setUserAnswer(index)} />)}
            </div>
        </div>

        {latestLevel && latestLevel.userAnswer !== null && !userConfirm && <div>
            <p>Are you sure?</p>
            <Button data-testid='are_you_sure' buttonText="That's my final answer" onClick={() => {
                setUserConfirm(true)
                scoreAnswer()
            }} />
        </div>}
        
        {userConfirm && <Modal isOpen={userConfirm} close={() => setNewLevel(levels.length + 1)}>
            <div style={{display: 'flex'}}>
                <div className={`${isCorrect ? 'isCorrect' : 'isNotCorrect'}`}></div>
                <div style={{paddingLeft: '1rem', textAlign: 'left'}}>
                    <h3>{isCorrect ? 'Gooood! Gooooood! That is correct' : 'Uh oh! Meesa think yousa clumsy'}</h3>
                    {isCorrect && <p></p>}
                    {!isCorrect && <p>The correct answer is {latestLevel?.allAnswers[latestLevel.correctAnswer]}</p>}
                </div>
            </div>
            
            <Button data-testid='next' buttonText="Next Question" onClick={() => setNewLevel(levels.length + 1)} />
        </Modal>}
    </div>
}

export default Level