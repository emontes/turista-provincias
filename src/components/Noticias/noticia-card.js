import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ReactMarkdown from 'react-markdown'
import { FaRegClock } from 'react-icons/fa'

const NoticiaCard = ({ noticia }) => {
  const topic = noticia.topics[0]
  const fecha = new Date(noticia.datePlano)
  const anyo = fecha.getFullYear()
  const hometext = noticia.hometext.data.hometext

  let imagen
  if (topic) {
    if (topic.image) {
      imagen = topic.image.localFile
    }
  }

  if (noticia.image) {
    imagen = noticia.image.localFile
  }

  let slug = ''
  if (noticia.locale != 'es') {
    slug += `/${noticia.locale}`
  }
  slug += `/article${noticia.dateslug}-${noticia.slug}.html`
  if (noticia.slugOld) slug = `/${noticia.slugOld}`

  return (
    <Wraper className=" transition rounded-lg bg-white hover:bg-slate-50 shadow-md hover:shadow-lg relative mb-5 p-4">
      <Link to={slug}>
        <h3 className="text-2xl md:hidden">{noticia.title}</h3>
        <div className="flex gap-4 items-center">
          {imagen && (
            <GatsbyImage
              image={getImage(imagen)}
              className="rounded topic-image"
              alt={topic ? topic.Title : 'Sin Tema Definido'}
              title={topic ? topic.Title : 'Sit Tema Definido'}
            />
          )}

          <div>
            <h3 className="text-2xl hidden md:block">{noticia.title}</h3>

            <ReactMarkdown children={hometext} />
          </div>
        </div>
        <footer className="mt-8 pt-4 border-t flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-2">
            <FaRegClock className="icon"></FaRegClock>
            {noticia.date}
          </span>
          {noticia.location && (
            <span className="bg-slate-200 shadow rounded text-slate-500 tracking-widest px-2 py-1 uppercase font-bold">
              {noticia.location.name}
            </span>
          )}
        </footer>
      </Link>
    </Wraper>
  )
}

const Wraper = styled.article`
  .topic-image {
    max-width: 12rem;
    height: 12rem;
  }
`

export const query = graphql`
  fragment NoticiaCard on STRAPI_NOTICIA {
    id
    slug
    slugOld
    title
    date(formatString: "ddd D MMM yy", locale: "es")
    dateslug: date(formatString: "yy-M")
    datePlano: date
    locale
    image {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    hometext {
      data {
        hometext
      }
    }
    location {
      name
    }
    topics {
      Title
      slug
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
    }
    localizations {
      data {
        attributes {
          title
          slug
        }
      }
    }
  }
`

export default NoticiaCard
