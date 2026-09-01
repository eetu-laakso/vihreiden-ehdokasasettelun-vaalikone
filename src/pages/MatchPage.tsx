import { useMemo, useState } from 'react'
import { candidates } from '../data/candidates'
import { questions } from '../data/questions'
import { rankCandidates } from '../lib/matching'
import { useVoterAnswers } from '../lib/VoterAnswersContext'
import { useI18n } from '../i18n/LocaleContext'
import { href, scrollToTop } from '../lib/router'
import { LikertInput } from '../components/LikertInput'
import { Avatar } from '../components/Avatar'
import type { AnswerValue } from '../types'

type Phase = 'quiz' | 'results'

export function MatchPage() {
  const { locale, t } = useI18n()
  const { answers, setAnswer, reset, answeredCount } = useVoterAnswers()
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<Phase>(answeredCount > 0 ? 'results' : 'quiz')

  const results = useMemo(() => rankCandidates(answers, candidates), [answers])
  const question = questions[step]
  const isLast = step === questions.length - 1

  function goTo(next: number) {
    setStep(Math.min(Math.max(next, 0), questions.length - 1))
  }

  function handleAnswer(value: AnswerValue) {
    setAnswer(question.id, value)
    if (!isLast) goTo(step + 1)
  }

  function handleSkip() {
    setAnswer(question.id, null)
    if (isLast) {
      setPhase('results')
      scrollToTop()
    } else {
      goTo(step + 1)
    }
  }

  function showResults() {
    setPhase('results')
    scrollToTop()
  }

  function restart() {
    reset()
    setStep(0)
    setPhase('quiz')
    scrollToTop()
  }

  if (phase === 'quiz') {
    return (
      <section className="quiz">
        <h1>{t('match.title')}</h1>
        <p className="page-head__lead">{t('match.lead')}</p>

        <div className="quiz__progress">
          <p>{t('match.progress', { current: step + 1, total: questions.length })}</p>
          <div
            className="progressbar"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={questions.length}
          >
            <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="quiz__card">
          <h2 className="quiz__question">{question.text[locale]}</h2>
          {question.info && <p className="quiz__info">{question.info[locale]}</p>}
          <LikertInput
            name={`voter-${question.id}`}
            value={answers[question.id] ?? null}
            onChange={handleAnswer}
            legend={question.text[locale]}
          />
        </div>

        <div className="quiz__actions">
          <button type="button" className="button" onClick={() => goTo(step - 1)} disabled={step === 0}>
            {t('match.prev')}
          </button>
          <button type="button" className="button button--ghost" onClick={handleSkip}>
            {t('match.skip')}
          </button>
          {isLast ? (
            <button type="button" className="button button--primary" onClick={showResults}>
              {t('match.showResults')}
            </button>
          ) : (
            <button type="button" className="button" onClick={() => goTo(step + 1)}>
              {t('match.next')}
            </button>
          )}
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="page-head">
        <h1>{t('match.results.title')}</h1>
        <p className="page-head__lead">{t('match.results.lead')}</p>
        <p className="results__actions">
          <button
            type="button"
            className="button"
            onClick={() => {
              setPhase('quiz')
              setStep(0)
              scrollToTop()
            }}
          >
            {t('match.editAnswers')}
          </button>
          <button type="button" className="button button--ghost" onClick={restart}>
            {t('match.restart')}
          </button>
        </p>
      </section>

      {answeredCount === 0 ? (
        <p className="empty">{t('match.unanswered')}</p>
      ) : (
        <ol className="results">
          {results.map(({ candidate, score, comparedCount }) => (
            <li className="results__item" key={candidate.id}>
              <a className="results__link" href={href(locale, 'candidates', candidate.id)}>
                <span className="results__rank" aria-hidden="true">
                  <Avatar candidate={candidate} />
                </span>
                <span className="results__body">
                  <span className="results__name">{candidate.name}</span>
                  <span className="results__meta">
                    {score === null
                      ? t('match.noOverlap')
                      : t('match.compared', { count: comparedCount })}
                  </span>
                  <span className="results__bar" aria-hidden="true">
                    <span style={{ width: `${score ?? 0}%` }} />
                  </span>
                </span>
                <span className="results__score">
                  {score === null ? '–' : `${score}%`}
                  <small>{t('match.agreement')}</small>
                </span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </>
  )
}
