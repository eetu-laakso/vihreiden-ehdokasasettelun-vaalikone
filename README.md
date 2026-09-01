# Vihreiden jäsenvaalikone

Voting advice application for the Green Party's **internal primary** for the parliamentary
election candidate list. Members browse and compare how the candidates answered ten
intraparty statements, and can optionally answer the same statements themselves to see
who they agree with.

Static single-page app: React + TypeScript + Vite, no backend, no runtime dependencies
beyond React. Deployable to any static host.

## Status

The ten statements are final in all three languages, and the 23 candidates standing in
the Varsinais-Suomi primary are listed by name. **No candidate answers have been submitted
yet** — every answer in `candidates.json` is `null`, and the site shows a notice saying so
until the first one arrives.

| What | Where | State |
| --- | --- | --- |
| The ten statements | `src/data/questions.ts` | Final (fi / sv / en) |
| Candidate names | `src/data/candidates.json` | Final, 23 candidates |
| Candidate answers | `src/data/candidates.json` | **Pending** — all `null` |
| Colours / branding | `src/index.css` (`:root` tokens) | Approved |

The official candidate introductions are hosted separately, on the Varsinais-Suomi Greens
site; every candidate-listing view links out to them. The URL lives in
`src/components/IntroLink.tsx`.

## Running

Node 24 (the version the deploy workflow builds with).

```bash
npm install
npm run dev
```

`npm run build` type-checks and produces `dist/`. `npm run lint` runs ESLint.

## Structure

```
src/
  types.ts              Domain types (Locale, Question, Candidate, AnswerValue)
  App.tsx               Routing, locale + voter-answer providers
  i18n/
    fi.ts sv.ts en.ts   Dictionaries; fi.ts is the reference the others are typed against
    index.ts            translate(), localized() fallback, locale detection
    LocaleContext.ts    useI18n() -> { locale, setLocale, t, l }
  data/
    questions.ts        The ten statements (fi / sv / en)
    candidates.json     Candidate data (the editable source of truth)
    constituencies.ts   Electoral district keys
  lib/
    router.ts           Hash router (#/{lang}/...)
    matching.ts         Voter/candidate agreement scoring
    storage.ts          localStorage for voter answers and language choice
  pages/                Home, Candidates, Candidate, Match, Answer, NotFound
  components/           Layout, LanguageSelector, LikertInput, AnswerScale, cards,
                        IntroLink (external candidate-introductions link)
```

### Routes

Hash routing, so no server rewrite rules are needed:

| Route | Page |
| --- | --- |
| `#/fi/` | Landing page |
| `#/fi/candidates` | Card grid and comparison table, with search/filter/sort |
| `#/fi/candidates/<id>` | One candidate's answers and reasoning |
| `#/fi/match` | Voter questionnaire, then ranked results |
| `#/fi/answer` | Candidate answer form (generates JSON, submits nothing) |

`fi`, `sv` and `en` are interchangeable in the first segment. A URL without a valid
language redirects to the visitor's remembered or browser-preferred language.

## The answer scale

Uniform four-point Likert, no neutral option:

| Value | Meaning |
| --- | --- |
| 1 | Fully disagree |
| 2 | Somewhat disagree |
| 3 | Somewhat agree |
| 4 | Fully agree |

`null` means the candidate did not answer. Statements either side left unanswered are
excluded from the agreement calculation rather than treated as neutral, so skipping never
moves a score up or down.

Agreement is `100 × (1 − mean(|voter − candidate|) / 3)` over the statements both answered.

## Adding candidate answers

1. The candidate fills in `#/fi/answer` and sends back the generated JSON object.
2. Save it into `submissions/` (git-ignored) and run the importer:

   ```bash
   node scripts/import-answers.mjs submissions/ --dry-run
   node scripts/import-answers.mjs submissions/
   ```

   It matches each submission to a roster entry by `id`, or by name if the id is missing,
   validates the answer values, and merges into `src/data/candidates.json`. The roster is
   authoritative: the importer never adds, removes, renames or reorders a candidate, and it
   writes nothing at all if any submission fails validation.
3. Commit `src/data/candidates.json` and push — the GitHub Actions workflow deploys it.

Hand-editing `candidates.json` works too; the importer just makes the common case safe.

Ids must be unique and stable. The `answers` keys must match the question ids in
`src/data/questions.ts` (`q01`–`q10`).

`sortName` is the ordering key, written "Surname Firstname" — Finnish candidate lists are
ordered by surname while the displayed `name` is given-name-first, and multi-word surnames
such as "Skarp Ruonakoski" cannot be derived automatically. A candidate without a
`sortName` falls back to sorting on `name`.

The constituency filter and the constituency sort option hide themselves while every
candidate is in the same constituency, which is the case today.

## Editing the statements

Keep the ids stable — candidate answers are keyed by them, so renaming an id silently
orphans every existing answer. Every statement needs all three languages. Candidate free
text (`role`, `bio`, `comments`) may be given in any subset of languages; the UI falls back
to Finnish, then to whatever is present.

## Adding a language

1. Add the code to `LOCALES` in `src/types.ts`.
2. Add `src/i18n/<code>.ts`, typed as `Strings` — TypeScript will list every missing key.
3. Register it in `dictionaries` in `src/i18n/index.ts`.
4. Add the language to the `text` object of every question.

## Deployment

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. Enable it once under **Settings → Pages → Source → GitHub
Actions**.

The workflow names Node twice and the two are unrelated: `node-version: 24` is the Node that
builds the site, while the major version on each `uses:` line determines which Node runtime
the actions themselves run in. GitHub removed Node 20 from the runners on 2026-09-16, so the
action majors are pinned at checkout@v7, setup-node@v7, upload-pages-artifact@v5 and
deploy-pages@v5. Do not downgrade them.

`vite.config.ts` sets `base: './'`, so the same build works from a user page, a project
page under `/repo-name/`, or a local `dist` preview without hardcoding a repository name.
This is safe because routing is hash-based — `index.html` is the only document.

## Privacy

Voter answers stay in the browser's `localStorage` and are never transmitted. The candidate
form generates a file locally; it posts nothing. There is no analytics and no backend.
