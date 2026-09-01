import { useSyncExternalStore } from 'react'
import type { Locale } from '../types'
import { isLocale } from '../i18n'

/**
 * Hash routing keeps the app deployable to any static host (GitHub Pages
 * included) without server rewrite rules. Paths look like `#/fi/candidates/c1`.
 */

function subscribe(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getHash(): string {
  return window.location.hash
}

export function useHash(): string {
  return useSyncExternalStore(subscribe, getHash, () => '')
}

export interface ParsedRoute {
  /** Locale from the first path segment, or `null` when missing/unknown. */
  locale: Locale | null
  /** Remaining path segments, e.g. `['candidates', 'c1']`. */
  segments: string[]
}

export function parseHash(hash: string): ParsedRoute {
  const path = hash.replace(/^#\/?/, '')
  const segments = path
    .split('/')
    .map((segment) => decodeURIComponent(segment))
    .filter(Boolean)
  const [first, ...rest] = segments
  return isLocale(first) ? { locale: first, segments: rest } : { locale: null, segments }
}

/** Builds a hash path, e.g. `href('fi', 'candidates', 'c1')` -> `#/fi/candidates/c1`. */
export function href(locale: Locale, ...segments: string[]): string {
  const parts = [locale, ...segments].map((segment) => encodeURIComponent(segment))
  return `#/${parts.join('/')}`
}

export function navigate(path: string): void {
  window.location.hash = path.startsWith('#') ? path.slice(1) : path
}

/** Replaces the current entry instead of pushing a new one (used for redirects). */
export function replace(path: string): void {
  const hash = path.startsWith('#') ? path : `#${path}`
  window.history.replaceState(null, '', hash)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'auto' })
}
