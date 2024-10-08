// src/components/Noticias/Topics.js

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
        {topics.map((item, index) => (
          <li key={index}>
            <Link
              to={`/noticias/tema/${item.fieldValue.replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.html`}
              className="category-menu"
              activeStyle={{ color: 'var(--clr-red-dark)' }}
            >
              {t(item.fieldValue)} ({item.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Topics