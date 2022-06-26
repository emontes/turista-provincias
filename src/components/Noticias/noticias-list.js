import React from 'react'
import NoticiaCard from './noticia-card'
import Pagination from './Pagination'
import BannerAdSense from '../../utilities/BannerAdsense'

const Noticias = ({ noticias, isHome, pageInfo, url }) => {
  return (
    <div>
      {noticias.map((noticia, i) => {
        return (
          <>
            {i % 3 === 0 && (
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

      {!isHome && <Pagination pageInfo={pageInfo} url={url} />}
    </div>
  )
}

export default Noticias
