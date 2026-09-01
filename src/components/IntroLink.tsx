import { useI18n } from '../i18n/LocaleContext'

/**
 * The official candidate introductions live on the Varsinais-Suomi Greens site.
 * This vaalikone only covers the ten statements, so every view that lists
 * candidates points members at the fuller introductions.
 *
 * The URL carries `kieli=fi`; it is used as-is for all three languages because
 * the other language codes that page accepts have not been confirmed.
 */
export const INTRO_URL =
  'https://varsinaissuomenvihreat.fi/jasenkysely-2026/?kieli=fi&vaali=varsinais-suomi-eduskuntavaalien-2027-jasenaanestys&alue=vp3'

interface IntroLinkProps {
  /** `card` for the home page callout, `inline` for a single line elsewhere. */
  variant?: 'card' | 'inline'
}

export function IntroLink({ variant = 'card' }: IntroLinkProps) {
  const { t } = useI18n()

  if (variant === 'inline') {
    return (
      <p className="intro-inline">
        <a href={INTRO_URL} target="_blank" rel="noreferrer noopener">
          {t('intro.title')}
          <span aria-hidden="true"> ↗</span>
        </a>
      </p>
    )
  }

  return (
    <aside className="intro-card">
      <div>
        <h2 className="intro-card__title">{t('intro.title')}</h2>
        <p className="intro-card__body">{t('intro.body')}</p>
      </div>
      <a
        className="button button--primary"
        href={INTRO_URL}
        target="_blank"
        rel="noreferrer noopener"
      >
        {t('intro.cta')}
        <span aria-hidden="true">↗</span>
      </a>
    </aside>
  )
}
