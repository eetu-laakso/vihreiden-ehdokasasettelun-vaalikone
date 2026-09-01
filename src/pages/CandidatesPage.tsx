import { useMemo, useState } from 'react'
import {
  candidates as allCandidates,
  hasPublishedAnswers,
  sortKey,
  usedConstituencies,
} from '../data/candidates'
import { questions } from '../data/questions'
import { agreement } from '../lib/matching'
import { useVoterAnswers } from '../lib/VoterAnswersContext'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'
import { href } from '../lib/router'
import { CandidateCard } from '../components/CandidateCard'
import { IntroLink } from '../components/IntroLink'
import { ScaleLegend } from '../components/ScaleLegend'
import { Avatar } from '../components/Avatar'
import { ANSWER_VALUES } from '../types'

type ViewMode = 'cards' | 'matrix'
type SortMode = 'name' | 'constituency' | 'match'

export function CandidatesPage() {
  const { locale, t } = useI18n()
  const { answers, answeredCount } = useVoterAnswers()
  const [query, setQuery] = useState('')
  const [constituency, setConstituency] = useState('')
  const [view, setView] = useState<ViewMode>('cards')
  const [sort, setSort] = useState<SortMode>('name')

  const hasVoterAnswers = answeredCount > 0
  const constituencyOptions = useMemo(
    () =>
      usedConstituencies().sort((a, b) =>
        t(`constituency.${a}` as StringKey).localeCompare(
          t(`constituency.${b}` as StringKey),
          locale,
        ),
      ),
    [locale, t],
  )

  const rows = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase()
    const filtered = allCandidates.filter((candidate) => {
      const matchesQuery =
        !normalisedQuery || candidate.name.toLowerCase().includes(normalisedQuery)
      const matchesConstituency = !constituency || candidate.constituency === constituency
      return matchesQuery && matchesConstituency
    })

    return filtered
      .map((candidate) => ({ candidate, score: agreement(answers, candidate).score }))
      .sort((a, b) => {
        if (sort === 'match' && hasVoterAnswers) {
          if (a.score === b.score) return sortKey(a.candidate).localeCompare(sortKey(b.candidate), 'fi')
          if (a.score === null) return 1
          if (b.score === null) return -1
          return b.score - a.score
        }
        if (sort === 'constituency' && a.candidate.constituency !== b.candidate.constituency) {
          return t(`constituency.${a.candidate.constituency}` as StringKey).localeCompare(
            t(`constituency.${b.candidate.constituency}` as StringKey),
            locale,
          )
        }
        return sortKey(a.candidate).localeCompare(sortKey(b.candidate), 'fi')
      })
  }, [answers, constituency, hasVoterAnswers, locale, query, sort, t])

  return (
    <>
      <section className="page-head">
        <h1>{t('candidates.title')}</h1>
        <p className="page-head__lead">{t('candidates.lead')}</p>
        <IntroLink variant="inline" />
        {!hasPublishedAnswers && <p className="banner">{t('data.pending')}</p>}
      </section>

      <section className="controls" aria-label={t('candidates.title')}>
        <div className="control">
          <label htmlFor="search">{t('candidates.search')}</label>
          <input
            id="search"
            type="search"
            value={query}
            placeholder={t('candidates.searchPlaceholder')}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {/* A one-option filter is just clutter; the primary is currently single-constituency. */}
        {constituencyOptions.length > 1 && (
          <div className="control">
            <label htmlFor="constituency">{t('candidates.filter.constituency')}</label>
            <select
              id="constituency"
              value={constituency}
              onChange={(event) => setConstituency(event.target.value)}
            >
              <option value="">{t('candidates.filter.all')}</option>
              {constituencyOptions.map((key) => (
                <option key={key} value={key}>
                  {t(`constituency.${key}` as StringKey)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="control">
          <label htmlFor="sort">{t('candidates.sort')}</label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
          >
            <option value="name">{t('candidates.sort.name')}</option>
            {constituencyOptions.length > 1 && (
              <option value="constituency">{t('candidates.sort.constituency')}</option>
            )}
            <option value="match" disabled={!hasVoterAnswers}>
              {t('candidates.sort.match')}
            </option>
          </select>
        </div>

        <div className="control control--toggle" role="group" aria-label={t('candidates.view.cards')}>
          <button
            type="button"
            aria-pressed={view === 'cards'}
            onClick={() => setView('cards')}
          >
            {t('candidates.view.cards')}
          </button>
          <button
            type="button"
            aria-pressed={view === 'matrix'}
            onClick={() => setView('matrix')}
          >
            {t('candidates.view.matrix')}
          </button>
        </div>
      </section>

      <p className="result-count">
        {t('candidates.count', { count: rows.length })}
        {!hasVoterAnswers && (
          <>
            {' · '}
            <a href={href(locale, 'match')}>{t('candidates.matchHint')}</a>
          </>
        )}
      </p>

      {rows.length === 0 ? (
        <p className="empty">{t('candidates.empty')}</p>
      ) : view === 'cards' ? (
        <div className="grid">
          {rows.map(({ candidate, score }) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              score={hasVoterAnswers ? score : undefined}
            />
          ))}
        </div>
      ) : (
        <>
          <p className="note">{t('matrix.scrollHint')}</p>
          <div className="matrix-wrap">
            <table className="matrix">
              <caption className="visually-hidden">{t('candidates.view.matrix')}</caption>
              <thead>
                <tr>
                  <th scope="col" className="matrix__name">
                    {t('matrix.candidate')}
                  </th>
                  {questions.map((question, index) => (
                    <th key={question.id} scope="col" className="matrix__q">
                      <abbr title={question.text[locale]}>{`Q${index + 1}`}</abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ candidate }) => (
                  <tr key={candidate.id}>
                    <th scope="row" className="matrix__name">
                      <a href={href(locale, 'candidates', candidate.id)}>
                        <Avatar candidate={candidate} />
                        <span>
                          {candidate.name}
                          <small>{t(`constituency.${candidate.constituency}` as StringKey)}</small>
                        </span>
                      </a>
                    </th>
                    {questions.map((question) => {
                      const value = candidate.answers[question.id] ?? null
                      return (
                        <td key={question.id} className="matrix__cell" data-value={value ?? 'none'}>
                          <span aria-hidden="true">{value ?? '–'}</span>
                          <span className="visually-hidden">
                            {value === null
                              ? t('candidate.noAnswer')
                              : t(`scale.${value}` as StringKey)}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ScaleLegend values={ANSWER_VALUES} />
        </>
      )}
    </>
  )
}
