import {it, describe, expect} from 'vitest'
import { FilmQA } from './filmQA'

const mockData = [
    {
        title: "When Harry met Sally",
        episode_id: 1,
        director: "I don't know, somebody",
        release_date: "in the 1980s"
    },
    {
        title: "Ghostbusters",
        episode_id: 2,
        director: "Ivan Reitman",
        release_date: "1984"
    }
]

describe("gameLogic/filmQA", () => {

    it('should return a new class of film questions that does not break if provided an empty array', () => {
        const filmQA = new FilmQA([])
        const questions = filmQA.getQuestions()

        expect(questions.length).toBe(1) //because I hardcoded the first question so makes sense
    })

    it('should return the correct array of questions and answers based on the array data provided', () => {
        
        const filmQA = new FilmQA(mockData)
        const questions = filmQA.getQuestions()

        expect(questions.length).toBe(5) // because we are adding two questions, one about director and one about release date for each item (and hardcoded one too)
    })

    it('should return the correct array of questions and answers based on the array data provided', () => {
        
        const filmQA = new FilmQA(mockData)
        const questions = filmQA.getQuestions()

        expect(questions.length).toBe(5) // because we are adding two questions, one about director and one about release date (and hardcoded one too)
    })

    it('should return the correct answer for a question', () => {
        const filmQA = new FilmQA(mockData)
        const questions = filmQA.getQuestions()

        const answers = filmQA.getAnswers(questions[0])
        expect(answers.correct).toEqual('The Last Jedi')
        expect(answers.incorrect).toContain('A Phantom Menace')
        expect(answers.incorrect).toContain('Return of the Jedi')
    })

})