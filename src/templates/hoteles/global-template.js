import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../components/Seo'

const Global = ({ data, pageContext }) => {
  console.log('DAta from global template: ', data)
  console.log('El pageContext:', pageContext)
  return (
    <Layout>
      <Seo />
      <section className=" nav_main">
        <h2 className="nav_main--h2">{pageContext.estadoSlug}</h2>
        <div className="economy_bg">
          <div className="nav_link_details">
            Global {pageContext.item.slug} {pageContext.estadoSlug}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Global

export const pageQuery = graphql`
  query($estadoSlug: String) {
    hoteles: allStrapiHotelHotellook(
      filter: {
        hotel_location: { location: { estado: { slug: { eq: $estadoSlug } } } }
        pricefrom: { gt: 0 }
        photoCount: { gt: 0 }
      }
      sort: { fields: pricefrom, order: ASC }
      limit: 60
    ) {
      nodes {
        ...ListaHoteles
      }
    }
  }
`
