import type { AnswerValue } from '../types'
import { ANSWER_VALUES } from '../types'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'

interface AnswerScaleProps {
  value: AnswerValue | null
  /** The visitor's own answer, drawn as a second marker for comparison. */
  voterValue?: AnswerValue | null
}

/** Read-only rendering of one answer on the four-point scale. */
export function AnswerScale({ value, voterValue }: AnswerScaleProps) {
  const { t } = useI18n()

  return (
    <div className="scale">
      <div className="scale__track">
        {ANSWER_VALUES.map((option) => {
          const isAnswer = value === option
          const isVoter = voterValue === option
          return (
            <div
              key={option}
              className="scale__step"
              data-value={option}
              data-selected={isAnswer || undefined}
              data-voter={isVoter || undefined}
            >
              <span className="scale__label">{t(`scale.short.${option}` as StringKey)}</span>
            </div>
          )
        })}
      </div>
      {value === null && <p className="scale__empty">{t('candidate.noAnswer')}</p>}
    </div>
  )
}
