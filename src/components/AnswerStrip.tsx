import type { Candidate } from '../types'
import { questions } from '../data/questions'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'

interface AnswerStripProps {
  candidate: Candidate
}

/** Compact one-cell-per-statement summary used on candidate cards. */
export function AnswerStrip({ candidate }: AnswerStripProps) {
  const { t } = useI18n()

  return (
    <ul className="strip">
      {questions.map((question, index) => {
        const value = candidate.answers[question.id] ?? null
        const label =
          value === null
            ? `${t('common.question')} ${index + 1}: ${t('candidate.noAnswer')}`
            : `${t('common.question')} ${index + 1}: ${t(`scale.${value}` as StringKey)}`
        return (
          <li key={question.id} className="strip__cell" data-value={value ?? 'none'} title={label}>
            <span className="visually-hidden">{label}</span>
          </li>
        )
      })}
    </ul>
  )
}
