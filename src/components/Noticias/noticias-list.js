import React, { useState } from 'react'
import NoticiaCard from './noticia-card'
import Pagination from './Pagination'
import BannerAdSense from '../../utilities/BannerAdsense'
import ButtonMoreHotels from '../atoms/ButtonMoreHotels'

const Noticias = ({ noticias, isHome, pageInfo, url, perPage }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataNoticias, setDataNoticias] = useState(
    noticias.slice(0, perPage * currentPage),
  )

  const onMoreNoticias = () => {
    const newPage = currentPage + 1
    setDataNoticias(noticias.slice(0, perPage * newPage))
    setCurrentPage(newPage)
  }
  return (
    <div>
      {dataNoticias.map((noticia, i) => {
        return (
          <>
            {i % 5 === 0 && i > 0 && (
              <BannerAdSense
                slot="9869048679"
                format="fluid"
                layoutKey="-ch-4k+ey-rv+je"
              />
            )}
            <NoticiaCard key={noticia.id} noticia={noticia} />
          </>
        )
      })}
      {dataNoticias.length < noticias.length && (
        <ButtonMoreHotels onClick={onMoreNoticias} title="Más Noticias..." />
      )}
      {!isHome && <Pagination pageInfo={pageInfo} url={url} />}
    </div>
  )
}

export default Noticias
