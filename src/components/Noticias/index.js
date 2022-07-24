import React from 'react'

import Banner from '../Banner/indexNoticias'

import BannerAdsense from '../../utilities/BannerAdsense'
import NoticiasList from './noticias-list'

const Noticias = ({
  noticias,
  isHome,
  title = 'Noticias',
  description = 'Noticias de Turismo',
  perPage = 16,
  pageInfo,
  url,
  topics,
  categories,
}) => {
  return (
    <>
      <section
        className="section cont-area"
        style={{ background: 'var(--clr-white' }}
      >
        <div className="section-center">
          <NoticiasList
            noticias={noticias}
            perPage={perPage}
            isHome={isHome}
            pageInfo={pageInfo}
            url={url}
          />
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
      <BannerAdsense />
    </>
  )
}

export default Noticias
