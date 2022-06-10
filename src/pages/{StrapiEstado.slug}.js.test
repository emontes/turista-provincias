import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

const EstadoTemplate = ({ pageContext: { Name }, data }) => {
  return (
    <Layout>
      <div className="cont-area">
        <h1>{data.strapiEstado.Name}</h1>
        <p>
          <b>Latitud:</b> {data.strapiEstado.latitude} <br />
          <b>Longitud:</b> {data.strapiEstado.longitude} <br />
        </p>
        <p>
          <b>Dos dígitos:</b> {data.strapiEstado.dosdigitos} <br />
          <b>Tres dígitos:</b> {data.strapiEstado.tresdigitos} <br />
          <b>Renapo:</b> {data.strapiEstado.renapo} <br />
          <b>Variable:</b> {data.strapiEstado.variable} <br />
          <b>Slug:</b> {data.strapiEstado.slug} <br />
        </p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getEstadote($slug: String) {
    strapiEstado(slug: { eq: $slug }) {
      Name
      latitude
      longitude
      dosdigitos
      renapo
      slug
      tresdigitos
      variable
    }
  }
`

export default EstadoTemplate
