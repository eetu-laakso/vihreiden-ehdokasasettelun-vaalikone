import type { Candidate } from '../types'
import rawCandidates from './candidates.json'

/**
 * `candidates.json` holds the 23 candidates standing in the Varsinais-Suomi
 * primary. Their names and constituency are real; every answer is still `null`
 * because no submissions have come back yet. Fill them in from the candidate
 * answer form (`#/fi/answer`) as they arrive — no other file needs touching.
 *
 * The JSON is deliberately the editable source of truth: it can be replaced
 * wholesale without changing any TypeScript.
 */
/** Surname-first ordering key, as Finnish candidate lists are ordered. */
export function sortKey(candidate: Candidate): string {
  return candidate.sortName ?? candidate.name
}

export const candidates: Candidate[] = (rawCandidates as unknown as Candidate[])
  .slice()
  .sort((a, b) => sortKey(a).localeCompare(sortKey(b), 'fi'))

/** False while the candidate list is known but nobody's answers are in yet. */
export const hasPublishedAnswers = candidates.some((candidate) =>
  Object.values(candidate.answers).some((answer) => answer != null),
)

export function getCandidate(id: string): Candidate | undefined {
  return candidates.find((candidate) => candidate.id === id)
}

/** Constituencies that actually have candidates, in dictionary order. */
export function usedConstituencies(): string[] {
  return [...new Set(candidates.map((candidate) => candidate.constituency))]
}
