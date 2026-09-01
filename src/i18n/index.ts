import type { Locale, PartialLocalizedText } from '../types'
import { FALLBACK_LOCALE, LOCALES } from '../types'
import fi, { type StringKey, type Strings } from './fi'
import sv from './sv'
import en from './en'

export const dictionaries: Record<Locale, Strings> = { fi, sv, en }

export type { StringKey, Strings }

/** Variables interpolated into a string, e.g. `{count}`. */
export type TranslationVars = Record<string, string | number>

export function translate(locale: Locale, key: StringKey, vars?: TranslationVars): string {
  const template = dictionaries[locale][key] ?? dictionaries[FALLBACK_LOCALE][key] ?? key
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  )
}

/**
 * Picks the best available language for content that may not be translated
 * (candidate free text). Falls back to Finnish, then to any language present.
 */
export function localized(
  text: PartialLocalizedText | undefined,
  locale: Locale,
): string | undefined {
  if (!text) return undefined
  const preferred = text[locale]
  if (preferred?.trim()) return preferred
  const fallback = text[FALLBACK_LOCALE]
  if (fallback?.trim()) return fallback
  for (const candidate of LOCALES) {
    const value = text[candidate]
    if (value?.trim()) return value
  }
  return undefined
}

/** Whether the shown text had to fall back to another language. */
export function isFallbackLanguage(
  text: PartialLocalizedText | undefined,
  locale: Locale,
): boolean {
  return Boolean(text && !text[locale]?.trim() && localized(text, locale))
}

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale)
}

/** Best guess at the visitor's language from the browser, defaulting to Finnish. */
export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return FALLBACK_LOCALE
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.slice(0, 2).toLowerCase()
    if (isLocale(base)) return base
  }
  return FALLBACK_LOCALE
}
