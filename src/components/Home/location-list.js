import React from 'react'
import { Link } from 'gatsby'
import Title from '../atoms/Title'
import ItemChevron from '../../components/atoms/ItemChevronRight'

const Lista = ({ metadata, locations }) => {
  return (
    <section>
      <Title
        title="Principales Destinos "
        subtitle={`en ${metadata.estado.name}`}
        className="mt-12"
      />
      <ul className="columns-2 sm:columns-3 xl:columns-4">
        {locations.map((item, i) => {
          return (
            <li key={i}>
              <Link
                to={`/${item.hotel_location.slug}.html`}
                title={`Hoteles en ${item.name}`}
              >
                <ItemChevron text={item.name} />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Lista
