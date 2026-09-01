import type { AnswerValue } from '../types'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'

interface ScaleLegendProps {
  values: readonly AnswerValue[]
}

export function ScaleLegend({ values }: ScaleLegendProps) {
  const { t } = useI18n()

  return (
    <div className="legend">
      <span className="legend__title">{t('matrix.legend')}</span>
      <ul>
        {values.map((value) => (
          <li key={value}>
            <span className="legend__swatch" data-value={value} aria-hidden="true">
              {value}
            </span>
            {t(`scale.${value}` as StringKey)}
          </li>
        ))}
        <li>
          <span className="legend__swatch" data-value="none" aria-hidden="true">
            –
          </span>
          {t('candidate.noAnswer')}
        </li>
      </ul>
    </div>
  )
}
