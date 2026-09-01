/** Core domain types for the Green Party internal primary voting advice application. */

export type Locale = 'fi' | 'sv' | 'en'

export const LOCALES: readonly Locale[] = ['fi', 'sv', 'en']

/** Language used when a translation is missing. */
export const FALLBACK_LOCALE: Locale = 'fi'

/** A string that exists in every supported language. */
export type LocalizedText = Record<Locale, string>

/** A string that may only exist in some languages (e.g. candidate free text). */
export type PartialLocalizedText = Partial<Record<Locale, string>>

/**
 * Uniform Likert scale, no neutral option:
 * 1 = fully disagree, 2 = somewhat disagree, 3 = somewhat agree, 4 = fully agree.
 */
export type AnswerValue = 1 | 2 | 3 | 4

export const ANSWER_VALUES: readonly AnswerValue[] = [1, 2, 3, 4]

export interface Question {
  /** Stable id, referenced by candidate answer maps. Never renumber these. */
  id: string
  text: LocalizedText
  /** Optional background/clarification shown under the question. */
  info?: LocalizedText
}

export interface CandidateLink {
  label: string
  url: string
}

export interface Candidate {
  id: string
  name: string
  /**
   * Key used for alphabetical ordering, normally "Surname Firstname".
   * Finnish candidate lists are ordered by surname, but the displayed `name` is
   * given-name-first, so the two cannot be derived from each other reliably —
   * multi-word surnames like "Skarp Ruonakoski" need it spelled out. Falls back
   * to `name` when omitted.
   */
  sortName?: string
  /** Electoral district key, translated via `constituency.<key>` in the dictionaries. */
  constituency: string
  age?: number
  /** Current role or occupation. */
  role?: PartialLocalizedText
  /** Path or URL to a portrait; omitted candidates render initials instead. */
  photoUrl?: string
  links?: CandidateLink[]
  /** Short self-introduction. */
  bio?: PartialLocalizedText
  /** questionId -> answer. `null` means the candidate did not answer. */
  answers: Record<string, AnswerValue | null>
  /** questionId -> free-text justification, in whichever languages were given. */
  comments?: Record<string, PartialLocalizedText>
}

/** The voter's own answers in the matching flow. `null` = skipped. */
export type VoterAnswers = Record<string, AnswerValue | null>

export interface MatchResult {
  candidate: Candidate
  /** 0-100, or null when there is no overlap to compare. */
  score: number | null
  /** How many questions both the voter and the candidate answered. */
  comparedCount: number
}
