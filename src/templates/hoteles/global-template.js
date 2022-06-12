import React from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import Seo from '../../components/Seo'

const Global = ({ data, pageContext }) => {
  return (
    <Layout>
      <Seo />
      Global
    </Layout>
  )
}

export default Global

export const pageQuery = graphql`
  query($id: String) {
    hoteles: allStrapiHotelHotellook(
      filter: {
        cityId: { eq: $id }
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
