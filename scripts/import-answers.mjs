#!/usr/bin/env node
/**
 * Merges candidate submissions into src/data/candidates.json.
 *
 *   node scripts/import-answers.mjs submissions/heidi-aaltonen.json
 *   node scripts/import-answers.mjs submissions/          # every .json inside
 *   node scripts/import-answers.mjs submissions/ --dry-run
 *
 * A submission is the JSON produced by the "Ehdokkaalle" form (a single
 * candidate object), or an array of them. The roster in candidates.json is
 * authoritative for who is standing: this script never adds or removes a
 * candidate, it only fills in an existing one. Names, sort keys and
 * constituencies stay as they are in the roster, so an import can never
 * reorder or rename the list.
 *
 * Refuses to write anything if any submission fails validation.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const ROSTER_PATH = join(ROOT, 'src', 'data', 'candidates.json')

const MERGEABLE_FIELDS = ['age', 'role', 'bio', 'links']

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const inputs = args.filter((a) => !a.startsWith('--'))

if (inputs.length === 0) {
  console.error('usage: node scripts/import-answers.mjs <file-or-directory>... [--dry-run]')
  process.exit(2)
}

/** Fold a display name to something comparable: "Terhi Vörlund-Wallenius (sit.)" -> "terhi vorlund-wallenius". */
function foldName(name) {
  return String(name ?? '')
    .replace(/\(sit\.\)/gi, '')
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function collectFiles(input) {
  const path = resolve(input)
  if (statSync(path).isDirectory()) {
    return readdirSync(path)
      .filter((f) => extname(f).toLowerCase() === '.json')
      .sort()
      .map((f) => join(path, f))
  }
  return [path]
}

const roster = JSON.parse(readFileSync(ROSTER_PATH, 'utf8'))
// Every roster entry carries all ten keys, so the roster defines the valid set.
const questionIds = Object.keys(roster[0].answers)

const byId = new Map(roster.map((c) => [c.id, c]))
const byName = new Map(roster.map((c) => [foldName(c.name), c]))

const errors = []
const applied = []

for (const input of inputs) {
  for (const file of collectFiles(input)) {
    let parsed
    try {
      parsed = JSON.parse(readFileSync(file, 'utf8'))
    } catch (err) {
      errors.push(`${file}: not valid JSON — ${err.message}`)
      continue
    }

    for (const submission of Array.isArray(parsed) ? parsed : [parsed]) {
      const target = byId.get(submission.id) ?? byName.get(foldName(submission.name))

      if (!target) {
        errors.push(
          `${file}: no candidate on the roster matches id "${submission.id ?? '?'}" ` +
            `or name "${submission.name ?? '?'}". Fix the id to one of: ` +
            `${[...byId.keys()].join(', ')}`,
        )
        continue
      }

      const answers = submission.answers ?? {}
      const unknown = Object.keys(answers).filter((q) => !questionIds.includes(q))
      if (unknown.length > 0) {
        errors.push(`${file}: unknown question ids ${unknown.join(', ')}`)
        continue
      }

      const badValues = Object.entries(answers).filter(
        ([, v]) => v !== null && ![1, 2, 3, 4].includes(v),
      )
      if (badValues.length > 0) {
        errors.push(
          `${file}: answers must be 1-4 or null, got ` +
            badValues.map(([q, v]) => `${q}=${JSON.stringify(v)}`).join(', '),
        )
        continue
      }

      if (submission.constituency && submission.constituency !== target.constituency) {
        errors.push(
          `${file}: constituency "${submission.constituency}" does not match the roster's ` +
            `"${target.constituency}" for ${target.name}. Correct one of them by hand.`,
        )
        continue
      }

      // Merge per key so a partial submission does not wipe earlier answers.
      target.answers = { ...target.answers, ...answers }

      if (submission.comments) {
        target.comments = target.comments ?? {}
        for (const [questionId, text] of Object.entries(submission.comments)) {
          if (!questionIds.includes(questionId)) {
            errors.push(`${file}: comment for unknown question id ${questionId}`)
            continue
          }
          target.comments[questionId] = { ...target.comments[questionId], ...text }
        }
      }

      for (const field of MERGEABLE_FIELDS) {
        if (submission[field] !== undefined) target[field] = submission[field]
      }

      const answered = questionIds.filter((q) => target.answers[q] != null).length
      applied.push({ name: target.name, answered, total: questionIds.length, file })
    }
  }
}

if (errors.length > 0) {
  console.error('\nNothing was written. Fix these first:\n')
  for (const error of errors) console.error(`  ✗ ${error}`)
  console.error('')
  process.exit(1)
}

roster.sort((a, b) => (a.sortName ?? a.name).localeCompare(b.sortName ?? b.name, 'fi'))

if (!dryRun) {
  writeFileSync(ROSTER_PATH, `${JSON.stringify(roster, null, 2)}\n`, 'utf8')
}

console.log(dryRun ? '\nDry run — no files written.\n' : '\nUpdated src/data/candidates.json\n')
for (const entry of applied) {
  console.log(`  ✓ ${entry.name} — ${entry.answered}/${entry.total} answered`)
}

const complete = roster.filter((c) =>
  questionIds.every((q) => c.answers[q] != null),
).length
const started = roster.filter((c) => questionIds.some((q) => c.answers[q] != null)).length
console.log(
  `\nRoster: ${complete}/${roster.length} complete, ` +
    `${started - complete} partial, ${roster.length - started} not started.\n`,
)
