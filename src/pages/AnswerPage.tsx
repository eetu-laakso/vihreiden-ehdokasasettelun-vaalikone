import { useMemo, useState } from 'react'
import { constituencies } from '../data/constituencies'
import { questions } from '../data/questions'
import { LikertInput } from '../components/LikertInput'
import { useI18n } from '../i18n/LocaleContext'
import type { StringKey } from '../i18n'
import type { AnswerValue, Candidate } from '../types'

/** `Ada Esimerkki` -> `ada-esimerkki`, used as the candidate id in the JSON. */
function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function AnswerPage() {
  const { locale, t } = useI18n()

  const [name, setName] = useState('')
  const [constituency, setConstituency] = useState<string>(constituencies[0])
  const [age, setAge] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [comments, setComments] = useState<Record<string, string>>({})
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const answeredCount = Object.keys(answers).length

  const record = useMemo<Candidate>(() => {
    const parsedAge = Number.parseInt(age, 10)
    const candidate: Candidate = {
      id: slugify(name) || 'ehdokas',
      name: name.trim(),
      constituency,
      answers: Object.fromEntries(
        questions.map((question) => [question.id, answers[question.id] ?? null]),
      ),
    }
    if (Number.isFinite(parsedAge)) candidate.age = parsedAge
    if (role.trim()) candidate.role = { [locale]: role.trim() }
    if (bio.trim()) candidate.bio = { [locale]: bio.trim() }
    if (linkUrl.trim()) {
      candidate.links = [{ label: linkUrl.replace(/^https?:\/\//, ''), url: linkUrl.trim() }]
    }

    const filledComments = Object.entries(comments).filter(([, text]) => text.trim())
    if (filledComments.length > 0) {
      candidate.comments = Object.fromEntries(
        filledComments.map(([questionId, text]) => [questionId, { [locale]: text.trim() }]),
      )
    }
    return candidate
  }, [age, answers, bio, comments, constituency, linkUrl, locale, name, role])

  function generate() {
    if (!name.trim()) {
      setError(t('answer.missingName'))
      setOutput(null)
      return
    }
    if (answeredCount < questions.length) {
      setError(t('answer.missingAnswers'))
      setOutput(null)
      return
    }
    setError(null)
    setCopied(false)
    setOutput(JSON.stringify(record, null, 2))
  }

  async function copyOutput() {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  function download() {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${record.id}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <section className="page-head">
        <h1>{t('answer.title')}</h1>
        <p className="page-head__lead">{t('answer.lead')}</p>
      </section>

      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault()
          generate()
        }}
      >
        <fieldset className="form__section">
          <legend>{t('answer.section.info')}</legend>

          <div className="control">
            <label htmlFor="name">{t('answer.name')}</label>
            <input
              id="name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="control">
            <label htmlFor="form-constituency">{t('answer.constituency')}</label>
            <select
              id="form-constituency"
              value={constituency}
              onChange={(event) => setConstituency(event.target.value)}
            >
              {constituencies.map((key) => (
                <option key={key} value={key}>
                  {t(`constituency.${key}` as StringKey)}
                </option>
              ))}
            </select>
          </div>

          <div className="control">
            <label htmlFor="age">
              {t('answer.age')} <span className="hint">({t('common.optional')})</span>
            </label>
            <input
              id="age"
              type="number"
              min={18}
              max={120}
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <div className="control">
            <label htmlFor="role">
              {t('answer.role')} <span className="hint">({t('common.optional')})</span>
            </label>
            <input id="role" value={role} onChange={(event) => setRole(event.target.value)} />
          </div>

          <div className="control">
            <label htmlFor="bio">
              {t('answer.bio')} <span className="hint">({t('common.optional')})</span>
            </label>
            <textarea id="bio" rows={3} value={bio} onChange={(event) => setBio(event.target.value)} />
          </div>

          <div className="control">
            <label htmlFor="link">
              {t('answer.link')} <span className="hint">({t('common.optional')})</span>
            </label>
            <input
              id="link"
              type="url"
              placeholder="https://"
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="form__section">
          <legend>{t('answer.section.questions')}</legend>
          <p className="note">
            {t('answer.progress', { answered: answeredCount, total: questions.length })} ·{' '}
            {t('answer.commentLangNote', { language: t(`lang.${locale}` as StringKey) })}
          </p>

          <ol className="form__questions">
            {questions.map((question, index) => (
              <li className="form__question" key={question.id}>
                <p className="answers__number">
                  {t('common.question')} {index + 1}
                </p>
                <h3 className="answers__text">{question.text[locale]}</h3>
                {question.info && <p className="answers__info">{question.info[locale]}</p>}
                <LikertInput
                  name={`candidate-${question.id}`}
                  value={answers[question.id] ?? null}
                  legend={question.text[locale]}
                  onChange={(value) =>
                    setAnswers((current) => ({ ...current, [question.id]: value }))
                  }
                />
                <div className="control">
                  <label htmlFor={`comment-${question.id}`}>
                    {t('answer.comment')} <span className="hint">({t('common.optional')})</span>
                  </label>
                  <textarea
                    id={`comment-${question.id}`}
                    rows={2}
                    placeholder={t('answer.commentPlaceholder')}
                    value={comments[question.id] ?? ''}
                    onChange={(event) =>
                      setComments((current) => ({ ...current, [question.id]: event.target.value }))
                    }
                  />
                </div>
              </li>
            ))}
          </ol>
        </fieldset>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="button button--primary">
          {t('answer.generate')}
        </button>
      </form>

      {output && (
        <section className="output">
          <h2>{t('answer.section.output')}</h2>
          <p className="note">{t('answer.outputHelp')}</p>
          <div className="output__actions">
            <button type="button" className="button" onClick={() => void copyOutput()}>
              {copied ? t('answer.copied') : t('answer.copy')}
            </button>
            <button type="button" className="button" onClick={download}>
              {t('answer.download')}
            </button>
          </div>
          <pre className="output__json">{output}</pre>
        </section>
      )}
    </>
  )
}
