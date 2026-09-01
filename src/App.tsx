import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AnswerValue, Locale, PartialLocalizedText, VoterAnswers } from './types'
import { detectLocale, localized, translate, type StringKey, type TranslationVars } from './i18n'
import { LocaleContext } from './i18n/LocaleContext'
import { VoterAnswersContext } from './lib/VoterAnswersContext'
import { href, parseHash, replace, scrollToTop, useHash } from './lib/router'
import { loadLocale, loadVoterAnswers, saveLocale, saveVoterAnswers, clearVoterAnswers } from './lib/storage'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { CandidatesPage } from './pages/CandidatesPage'
import { CandidatePage } from './pages/CandidatePage'
import { MatchPage } from './pages/MatchPage'
import { AnswerPage } from './pages/AnswerPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  const hash = useHash()
  const { locale: routeLocale, segments } = parseHash(hash)
  const path = segments.join('/')

  const [voterAnswers, setVoterAnswers] = useState<VoterAnswers>(loadVoterAnswers)

  // Every URL carries its language, so a missing or unknown one is redirected
  // to the visitor's remembered or browser-preferred language.
  useEffect(() => {
    if (!routeLocale) {
      const initial = loadLocale() ?? detectLocale()
      replace(href(initial, ...path.split('/').filter(Boolean)))
    }
  }, [routeLocale, path])

  const locale: Locale = routeLocale ?? 'fi'

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = translate(locale, 'app.name')
  }, [locale])

  useEffect(() => {
    scrollToTop()
  }, [path])

  const setLocale = useCallback(
    (next: Locale) => {
      saveLocale(next)
      replace(href(next, ...path.split('/').filter(Boolean)))
    },
    [path],
  )

  const i18nValue = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: StringKey, vars?: TranslationVars) => translate(locale, key, vars),
      l: (text: PartialLocalizedText | undefined) => localized(text, locale),
    }),
    [locale, setLocale],
  )

  const answersValue = useMemo(
    () => ({
      answers: voterAnswers,
      answeredCount: Object.values(voterAnswers).filter((value) => value != null).length,
      setAnswer: (questionId: string, value: AnswerValue | null) => {
        setVoterAnswers((current) => {
          const next = { ...current }
          if (value === null) {
            delete next[questionId]
          } else {
            next[questionId] = value
          }
          saveVoterAnswers(next)
          return next
        })
      },
      reset: () => {
        clearVoterAnswers()
        setVoterAnswers({})
      },
    }),
    [voterAnswers],
  )

  if (!routeLocale) return null

  const [section = '', param] = segments

  let page
  if (section === '') {
    page = <HomePage />
  } else if (section === 'candidates') {
    page = param ? <CandidatePage candidateId={param} /> : <CandidatesPage />
  } else if (section === 'match') {
    page = <MatchPage />
  } else if (section === 'answer') {
    page = <AnswerPage />
  } else {
    page = <NotFoundPage />
  }

  return (
    <LocaleContext.Provider value={i18nValue}>
      <VoterAnswersContext.Provider value={answersValue}>
        <Layout section={section}>{page}</Layout>
      </VoterAnswersContext.Provider>
    </LocaleContext.Provider>
  )
}

export default App
