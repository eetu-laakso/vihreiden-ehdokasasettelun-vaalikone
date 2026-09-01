import { createContext, useContext } from 'react'
import type { Locale, PartialLocalizedText } from '../types'
import { FALLBACK_LOCALE } from '../types'
import { localized, translate, type StringKey, type TranslationVars } from './index'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Translate a UI string. */
  t: (key: StringKey, vars?: TranslationVars) => string
  /** Pick the best available language for content strings. */
  l: (text: PartialLocalizedText | undefined) => string | undefined
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: FALLBACK_LOCALE,
  setLocale: () => undefined,
  t: (key, vars) => translate(FALLBACK_LOCALE, key, vars),
  l: (text) => localized(text, FALLBACK_LOCALE),
})

export function useI18n(): LocaleContextValue {
  return useContext(LocaleContext)
}
