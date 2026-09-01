import type { AnswerValue, Locale, VoterAnswers } from '../types'
import { ANSWER_VALUES } from '../types'
import { isLocale } from '../i18n'

/**
 * The voter's own answers stay in this browser only — nothing is sent anywhere.
 * Every access is guarded because private-browsing modes can throw on access.
 */
const ANSWERS_KEY = 'vaalikone.voterAnswers'
const LOCALE_KEY = 'vaalikone.locale'

function readItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage unavailable; the session simply will not be remembered.
  }
}

function removeItem(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Ignored for the same reason as above.
  }
}

function isAnswerValue(value: unknown): value is AnswerValue {
  return ANSWER_VALUES.includes(value as AnswerValue)
}

export function loadVoterAnswers(): VoterAnswers {
  const raw = readItem(ANSWERS_KEY)
  if (!raw) return {}
  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    const result: VoterAnswers = {}
    for (const [questionId, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (isAnswerValue(value)) result[questionId] = value
    }
    return result
  } catch {
    return {}
  }
}

export function saveVoterAnswers(answers: VoterAnswers): void {
  writeItem(ANSWERS_KEY, JSON.stringify(answers))
}

export function clearVoterAnswers(): void {
  removeItem(ANSWERS_KEY)
}

export function loadLocale(): Locale | null {
  const stored = readItem(LOCALE_KEY)
  return isLocale(stored ?? undefined) ? (stored as Locale) : null
}

export function saveLocale(locale: Locale): void {
  writeItem(LOCALE_KEY, locale)
}
