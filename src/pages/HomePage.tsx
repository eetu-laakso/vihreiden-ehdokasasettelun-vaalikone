import { hasPublishedAnswers } from '../data/candidates'
import { useI18n } from '../i18n/LocaleContext'
import { href } from '../lib/router'
import { IntroLink } from '../components/IntroLink'

export function HomePage() {
  const { locale, t } = useI18n()

  const steps = [
    { title: t('home.how.step1.title'), body: t('home.how.step1.body') },
    { title: t('home.how.step2.title'), body: t('home.how.step2.body') },
    { title: t('home.how.step3.title'), body: t('home.how.step3.body') },
  ]

  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow">{t('app.subtitle')}</p>
        <h1 className="hero__title">{t('home.heading')}</h1>
        <p className="hero__lead">{t('home.lead')}</p>
        <div className="hero__actions">
          <a className="button button--primary" href={href(locale, 'candidates')}>
            {t('home.cta.browse')}
          </a>
          <a className="button" href={href(locale, 'match')}>
            {t('home.cta.match')}
          </a>
        </div>
        {!hasPublishedAnswers && <p className="banner">{t('data.pending')}</p>}
      </section>

      <IntroLink />

      <section className="panel">
        <h2>{t('home.how.title')}</h2>
        <ol className="steps">
          {steps.map((step, index) => (
            <li className="steps__item" key={step.title}>
              <span className="steps__number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="note">{t('home.disclaimer')}</p>
      </section>
    </>
  )
}
