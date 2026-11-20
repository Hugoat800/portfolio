import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TECHNOS, CATEGORIES_TECHNOS } from '../data/technos'
import Section from './Section'
export default function Technologies() {
  const { t } = useTranslation()
  const [category, setCategory] = useState<string | null>(null)
  const technologies = TECHNOS.filter((item) => !category || item.categories.includes(category))
  return (
    <Section id="technos">
      <div className="filter-bar" role="group" aria-label={t('common.filterCategory')}>
        {[null, ...CATEGORIES_TECHNOS].map((item) => (
          <button
            key={item ?? 'all'}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item ? t(`categories.${item}`) : t('common.all')}
          </button>
        ))}
      </div>
      <ul className="technology-list">
        {technologies.map((item) => (
          <li key={item.name}>
            <img src={item.logo} alt="" loading="lazy" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
