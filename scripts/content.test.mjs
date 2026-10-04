import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import ts from 'typescript'

function data(file) {
  const exports = {}
  const code = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  new Function('exports', code)(exports)
  return exports
}
const { PROJECTS } = data('src/data/projects.ts')
const { SKILLS } = data('src/data/skills.ts')
const { TECHNOS, CATEGORIES_TECHNOS } = data('src/data/technos.ts')
const { PROFILE } = data('src/data/profile.ts')
const locales = ['fr', 'en'].map((lang) =>
  JSON.parse(readFileSync(`src/i18n/locales/${lang}.json`, 'utf8')),
)
function shape(value) {
  if (Array.isArray(value)) return value.map(shape)
  if (typeof value === 'object' && value)
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, shape(value[key])]),
    )
  return typeof value
}
test('both locales cover the same UI and project content', () => {
  // Paragraphs can be combined in translation; all structured entries must stay aligned.
  const normalize = (locale) => {
    const copy = structuredClone(locale)
    for (const p of Object.values(copy.projects))
      for (const s of p.sections) s.paragraphs = s.paragraphs.length ? ['text'] : []
    return copy
  }
  assert.deepEqual(shape(normalize(locales[0])), shape(normalize(locales[1])))
  function check(value) {
    if (typeof value === 'string') assert.ok(value.trim(), 'Empty translated content')
    else if (value && typeof value === 'object') Object.values(value).forEach(check)
  }
  locales.forEach(check)
})
test('projects have unique identities, valid skills and complete translated content', () => {
  assert.equal(new Set(PROJECTS.map((p) => p.slug)).size, PROJECTS.length)
  assert.equal(new Set(PROJECTS.map((p) => p.id)).size, PROJECTS.length)
  for (const p of PROJECTS) {
    assert.match(p.slug, /^[a-z0-9-]+$/)
    for (const id of p.skills) assert.ok(SKILLS.some((s) => s.id === id))
    for (const locale of locales) {
      const text = locale.projects[p.slug]
      assert.ok(text?.title && text.description && text.sections.length)
      assert.deepEqual([...text.evidence.map((e) => e.id)].sort(), [...p.skills].sort())
    }
    for (const link of Object.values(p.links))
      if (link) {
        assert.equal(new URL(link).protocol, 'https:')
        assert.notEqual(link.replace(/\/$/, ''), 'https://github.com')
      }
  }
})
test('local project media, profile files and technology logos exist', () => {
  const files = [
    PROFILE.portrait,
    PROFILE.resumeIcon,
    ...PROFILE.socials.map((social) => social.icon),
    PROFILE.resume,
    ...TECHNOS.map((t) => t.logo),
    ...PROJECTS.flatMap((p) => [p.image, p.video].filter(Boolean)),
  ]
  for (const file of files) assert.ok(existsSync(`public${file}`), `Missing file: ${file}`)
})
test('skill levels and technology categories have translations', () => {
  for (const locale of locales) {
    for (const skill of SKILLS) assert.ok(locale.skills[skill.id].levels[skill.level - 1])
    for (const cat of CATEGORIES_TECHNOS) assert.ok(locale.categories[cat])
  }
})
test('translation interpolations are preserved', () => {
  for (const key of Object.keys(locales[0].common)) {
    const placeholders = (value) => [...value.matchAll(/{{(.*?)}}/g)].map((m) => m[1]).sort()
    assert.deepEqual(
      placeholders(locales[0].common[key]),
      placeholders(locales[1].common[key]),
      key,
    )
  }
})
