import { createContext, useContext } from 'react'
import type { AnswerValue, VoterAnswers } from '../types'

export interface VoterAnswersValue {
  answers: VoterAnswers
  setAnswer: (questionId: string, value: AnswerValue | null) => void
  reset: () => void
  /** How many statements the voter has taken a position on. */
  answeredCount: number
}

export const VoterAnswersContext = createContext<VoterAnswersValue>({
  answers: {},
  setAnswer: () => undefined,
  reset: () => undefined,
  answeredCount: 0,
})

export function useVoterAnswers(): VoterAnswersValue {
  return useContext(VoterAnswersContext)
}
