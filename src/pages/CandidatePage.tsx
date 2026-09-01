import { getCandidate } from '../data/candidates'
import { questions } from '../data/questions'
import { agreement } from '../lib/matching'
import { useVoterAnswers } from '../lib/VoterAnswersContext'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'
import { href } from '../lib/router'
import { AnswerScale } from '../components/AnswerScale'
import { Avatar } from '../components/Avatar'
import { NotFoundPage } from './NotFoundPage'

interface CandidatePageProps {
  candidateId: string
}

export function CandidatePage({ candidateId }: CandidatePageProps) {
  const { locale, t, l } = useI18n()
  const { answers, answeredCount } = useVoterAnswers()
  const candidate = getCandidate(candidateId)

  if (!candidate) {
    return <NotFoundPage message={t('candidate.notFound')} />
  }

  const { score } = agreement(answers, candidate)
  const answered = questions.filter((question) => candidate.answers[question.id] != null).length

  return (
    <>
      <p className="back">
        <a href={href(locale, 'candidates')}>{t('candidate.back')}</a>
      </p>

      <section className="profile">
        <Avatar candidate={candidate} size="large" />
        <div className="profile__body">
          <h1>{candidate.name}</h1>
          <p className="profile__meta">
            {t(`constituency.${candidate.constituency}` as StringKey)}
            {candidate.age !== undefined && ` · ${String(candidate.age)}`}
            {l(candidate.role) && ` · ${l(candidate.role) ?? ''}`}
          </p>
          {l(candidate.bio) && <p className="profile__bio">{l(candidate.bio)}</p>}
          {candidate.links && candidate.links.length > 0 && (
            <p className="profile__links">
              <span className="profile__links-label">{t('candidate.links')}: </span>
              {candidate.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer noopener">
                  {link.label}
                </a>
              ))}
            </p>
          )}
        </div>
        {answeredCount > 0 && score !== null && (
          <p className="profile__score">
            <strong>{score}%</strong>
            <span>{t('match.agreement')}</span>
          </p>
        )}
      </section>

      <section className="answers">
        <h2>{t('candidate.answers')}</h2>
        <p className="note">
          {t('candidate.answeredCount', { answered, total: questions.length })}
        </p>

        <ol className="answers__list">
          {questions.map((question, index) => {
            const value = candidate.answers[question.id] ?? null
            const comment = l(candidate.comments?.[question.id])
            return (
              <li className="answers__item" key={question.id}>
                <p className="answers__number">
                  {t('common.question')} {index + 1}
                </p>
                <h3 className="answers__text">{question.text[locale]}</h3>
                {question.info && <p className="answers__info">{question.info[locale]}</p>}
                <AnswerScale value={value} voterValue={answers[question.id] ?? null} />
                {answeredCount > 0 && answers[question.id] != null && (
                  <p className="answers__yours">
                    {t('match.yourAnswer')}:{' '}
                    {t(`scale.${answers[question.id] ?? 1}` as StringKey)}
                  </p>
                )}
                {comment && (
                  <blockquote className="answers__comment">
                    <p>{comment}</p>
                    <footer>{t('candidate.comment')}</footer>
                  </blockquote>
                )}
              </li>
            )
          })}
        </ol>
      </section>
    </>
  )
}
