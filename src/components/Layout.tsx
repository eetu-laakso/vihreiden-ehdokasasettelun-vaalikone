import type { ReactNode } from 'react'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'
import { href } from '../lib/router'
import { LanguageSelector } from './LanguageSelector'

interface LayoutProps {
  /** First path segment after the language, used to mark the active nav item. */
  section: string
  children: ReactNode
}

const NAV: { segment: string; labelKey: StringKey }[] = [
  { segment: '', labelKey: 'nav.home' },
  { segment: 'candidates', labelKey: 'nav.candidates' },
  { segment: 'match', labelKey: 'nav.match' },
  { segment: 'answer', labelKey: 'nav.answer' },
]

function focusMain() {
  const main = document.getElementById('main')
  main?.focus()
  main?.scrollIntoView()
}

export function Layout({ section, children }: LayoutProps) {
  const { locale, t } = useI18n()

  return (
    <div className="shell">
      {/* A plain `#main` href would be swallowed by the hash router, so focus it directly. */}
      <button className="skip-link" type="button" onClick={focusMain}>
        {t('common.skipToContent')}
      </button>
      <header className="header">
        <div className="header__inner">
          <a className="brand" href={href(locale)}>
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__text">
              <span className="brand__name">{t('app.short')}</span>
              <span className="brand__sub">{t('app.subtitle')}</span>
            </span>
          </a>
          <nav className="nav" aria-label={t('app.name')}>
            {NAV.map((item) => (
              <a
                key={item.segment || 'home'}
                className="nav__link"
                href={item.segment ? href(locale, item.segment) : href(locale)}
                aria-current={item.segment === section ? 'page' : undefined}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>
          <LanguageSelector />
        </div>
      </header>

      <main id="main" className="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="footer">
        <p>{t('footer.note')}</p>
        <p className="footer__muted">{t('footer.dataNote')}</p>
      </footer>
    </div>
  )
}
