import { LOCALES } from '../types'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'

/** Language is part of the URL, so a switch is a navigation, not just state. */
export function LanguageSelector() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div className="langs" role="group" aria-label={t('lang.label')}>
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          className="langs__button"
          lang={option}
          aria-current={option === locale ? 'true' : undefined}
          onClick={() => setLocale(option)}
        >
          <span className="langs__code">{option.toUpperCase()}</span>
          <span className="visually-hidden">{t(`lang.${option}` as StringKey)}</span>
        </button>
      ))}
    </div>
  )
}
