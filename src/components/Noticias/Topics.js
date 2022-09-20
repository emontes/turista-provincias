import React from 'react'
import { Link } from 'gatsby'
import Title from '../Banner/Title'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Topics = ({ topics }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Title title={t('Temas')} />
      <ul>
        {topics.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={`/noticias/tema/${item.slug}`}
                className="category-menu"
                activeStyle={{ color: 'var(--clr-red-dark)' }}
              >
                {t(item.Title)}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Topics
