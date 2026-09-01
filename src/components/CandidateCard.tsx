import type { Candidate } from '../types'
import { questions } from '../data/questions'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'
import { href } from '../lib/router'
import { AnswerStrip } from './AnswerStrip'
import { Avatar } from './Avatar'

interface CandidateCardProps {
  candidate: Candidate
  /** Agreement percentage from the matching flow, when the voter has answered. */
  score?: number | null
}

export function CandidateCard({ candidate, score }: CandidateCardProps) {
  const { t, l, locale } = useI18n()
  const answered = questions.filter((question) => candidate.answers[question.id] != null).length

  return (
    <article className="card">
      <a className="card__link" href={href(locale, 'candidates', candidate.id)}>
        <Avatar candidate={candidate} />
        <div className="card__body">
          <h3 className="card__name">{candidate.name}</h3>
          <p className="card__meta">
            {t(`constituency.${candidate.constituency}` as StringKey)}
            {candidate.age !== undefined && ` · ${String(candidate.age)}`}
          </p>
          {l(candidate.role) && <p className="card__role">{l(candidate.role)}</p>}
        </div>
        {score != null && (
          <p className="card__score">
            <strong>{score}%</strong>
            <span>{t('match.agreement')}</span>
          </p>
        )}
      </a>
      <AnswerStrip candidate={candidate} />
      <p className="card__answered">
        {t('candidate.answeredCount', { answered, total: questions.length })}
      </p>
    </article>
  )
}
