import type { AnswerValue } from '../types'
import { ANSWER_VALUES } from '../types'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'

interface LikertInputProps {
  /** Unique within the page; groups the radio inputs together. */
  name: string
  value: AnswerValue | null
  onChange: (value: AnswerValue) => void
  /** Describes the group for screen readers. */
  legend: string
}

/**
 * The four-point agree/disagree scale used by both the voter questionnaire and
 * the candidate form. Real radio inputs keep arrow-key navigation working.
 */
export function LikertInput({ name, value, onChange, legend }: LikertInputProps) {
  const { t } = useI18n()

  return (
    <fieldset className="likert">
      <legend className="visually-hidden">{legend}</legend>
      {ANSWER_VALUES.map((option) => {
        const id = `${name}-${option}`
        return (
          <div className="likert__option" key={option}>
            <input
              type="radio"
              id={id}
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <label htmlFor={id} data-value={option}>
              <span className="likert__marker" aria-hidden="true" />
              <span className="likert__text">{t(`scale.${option}` as StringKey)}</span>
            </label>
          </div>
        )
      })}
    </fieldset>
  )
}
