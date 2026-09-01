import type { Candidate } from '../types'

interface AvatarProps {
  candidate: Candidate
  size?: 'small' | 'large'
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/** Portrait when one exists, otherwise initials — no placeholder image files. */
export function Avatar({ candidate, size = 'small' }: AvatarProps) {
  if (candidate.photoUrl) {
    return <img className={`avatar avatar--${size}`} src={candidate.photoUrl} alt="" />
  }
  return (
    <span className={`avatar avatar--${size} avatar--initials`} aria-hidden="true">
      {initials(candidate.name)}
    </span>
  )
}
