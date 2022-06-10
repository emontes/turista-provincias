import React from 'react'
import NoticiaCard from './noticia-card'
import Banner from '../Banner/indexNoticias'
import Pagination from './Pagination'
const Noticias = ({
  noticias,
  isHome,
  title = 'Noticias',
  description = 'Noticias de Turismo en Chiapas',
  pageInfo,
  url,
  topics,
  categories,
}) => {
  return (
    <section
      className="section cont-area"
      style={{ background: 'var(--clr-white' }}
    >
      <div className="section-center">
        <div>
          {noticias.map((noticia) => (
            <NoticiaCard key={noticia.id} noticia={noticia} />
          ))}
          {!isHome && <Pagination pageInfo={pageInfo} url={url} />}
        </div>
        <div>
          <Banner
            title={title}
            description={description}
            isHome={isHome}
            topics={topics}
            categories={categories}
          />
        </div>
      </div>
    </section>
  )
}

export default Noticias
