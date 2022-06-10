import React from 'react'
import { Link } from 'gatsby'
import Title from '../Banner/Title'

const Topics = ({ topics }) => {
  return (
    <div>
      <Title title="Temas" />
      <ul>
        {topics.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={`/noticias/tema/${item.slug}`}
                className="category-menu"
                activeStyle={{ color: 'var(--clr-red-dark)' }}
              >
                {item.Title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Topics
