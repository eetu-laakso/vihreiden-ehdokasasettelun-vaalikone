import type { Candidate, MatchResult, VoterAnswers } from '../types'
import { sortKey } from '../data/candidates'

/** Largest possible distance on the 1-4 scale. */
const MAX_DISTANCE = 3

/**
 * Agreement is the mean distance between the voter's and the candidate's
 * answers, inverted and expressed as a percentage. Statements either side
 * skipped are left out of the comparison entirely rather than treated as
 * neutral, so a skipped statement never pushes a score up or down.
 */
export function agreement(
  voterAnswers: VoterAnswers,
  candidate: Candidate,
): { score: number | null; comparedCount: number } {
  let totalDistance = 0
  let comparedCount = 0

  for (const [questionId, voterAnswer] of Object.entries(voterAnswers)) {
    const candidateAnswer = candidate.answers[questionId]
    if (voterAnswer == null || candidateAnswer == null) continue
    totalDistance += Math.abs(voterAnswer - candidateAnswer)
    comparedCount += 1
  }

  if (comparedCount === 0) return { score: null, comparedCount: 0 }

  const meanDistance = totalDistance / comparedCount
  const score = Math.round((1 - meanDistance / MAX_DISTANCE) * 100)
  return { score, comparedCount }
}

/** Candidates ranked best match first; unscorable candidates go last, by name. */
export function rankCandidates(
  voterAnswers: VoterAnswers,
  candidates: Candidate[],
): MatchResult[] {
  return candidates
    .map((candidate) => ({ candidate, ...agreement(voterAnswers, candidate) }))
    .sort((a, b) => {
      if (a.score === b.score) return sortKey(a.candidate).localeCompare(sortKey(b.candidate), 'fi')
      if (a.score === null) return 1
      if (b.score === null) return -1
      return b.score - a.score
    })
}

export function answeredCount(answers: Record<string, number | null>): number {
  return Object.values(answers).filter((value) => value != null).length
}
