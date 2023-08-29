import {create} from 'zustand'
import { Question } from '../types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'
import { getAllQuestions } from '../services/questions'

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: ()=>void
    goPreviousQuestion: ()=>void
    reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get)=> {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async(limit) => {        
            const json = await getAllQuestions()
            const questions = json.sort(()=> Math.random() - 0.5).slice(0, limit)
            set({questions})
        },
        selectAnswer: (questionId, answerIndex) => {
            const {questions} = get()
            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            const questionInfo = questions[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            if(isCorrectUserAnswer) confetti()
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }

            set({questions: newQuestions})
        },
        goNextQuestion: () => {
            const {currentQuestion, questions} = get()
            const nextQuestion = currentQuestion + 1
            if(nextQuestion < questions.length){
                set({currentQuestion: nextQuestion})
            }
        },
        goPreviousQuestion: () => {
            const {currentQuestion, questions} = get()
            const previousQuestion = currentQuestion - 1
            if(previousQuestion >=0){
                set({currentQuestion: previousQuestion})
            }
        },
        reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET')
          }
    }
}, {
    name: 'questions',
}))