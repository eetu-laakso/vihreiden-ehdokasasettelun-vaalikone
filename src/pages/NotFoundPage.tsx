import { useI18n } from '../i18n/LocaleContext'
import { href } from '../lib/router'

interface NotFoundPageProps {
  /** Overrides the generic body text, e.g. "candidate not found". */
  message?: string
}

export function NotFoundPage({ message }: NotFoundPageProps) {
  const { locale, t } = useI18n()

  return (
    <section className="page-head">
      <h1>{t('notfound.title')}</h1>
      <p className="page-head__lead">{message ?? t('notfound.body')}</p>
      <p>
        <a className="button" href={href(locale)}>
          {t('notfound.home')}
        </a>
      </p>
    </section>
  )
}
