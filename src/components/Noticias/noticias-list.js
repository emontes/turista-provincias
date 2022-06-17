import React from 'react'
import NoticiaCard from './noticia-card'
import Pagination from './Pagination'

const Noticias = ({ noticias, isHome, pageInfo, url }) => {
  return (
    <div>
      {noticias.map((noticia) => (
        <NoticiaCard key={noticia.id} noticia={noticia} />
      ))}
      {!isHome && <Pagination pageInfo={pageInfo} url={url} />}
    </div>
  )
}

export default Noticias
