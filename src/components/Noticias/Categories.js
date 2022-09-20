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
        {items.map((item, index) => {
          if (item.slug) {
            return (
              <li key={index}>
                <Link
                  to={`/noticias/${item.slug}`}
                  className="category-menu"
                  activeStyle={{ color: 'var(--clr-red-dark)' }}
                >
                  {item.name}
                </Link>
              </li>
            )
          } else return ''
        })}
      </ul>
    </div>
  )
}

export default Categories
