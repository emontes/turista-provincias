// src/components/Noticias/Categories.js

import React from 'react'
import { Link } from 'gatsby'
import Title from '../Banner/Title'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Categories = ({ items }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Title title={t('Categorías')} />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={`/noticias/${item.fieldValue.replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.html`}
              className="category-menu"
              activeStyle={{ color: 'var(--clr-red-dark)' }}
            >
              {item.fieldValue} ({item.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories