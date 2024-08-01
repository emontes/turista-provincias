import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ReactMarkdown from 'react-markdown'
import { FaRegClock } from 'react-icons/fa'

const NoticiaCard = ({ noticia }) => {
  console.log('La Noticia: ', noticia)
  // const topic = noticia.topics[0]
  const hometext = noticia.hometext

  let imagen
  // if (topic) {
  //   if (topic.image) {
  //     imagen = topic.image.localFile
  //   }
  // }

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
          {/* {imagen && (
            <GatsbyImage
              image={getImage(imagen)}
              className="rounded topic-image"
              alt={topic ? topic.Title : 'Sin Tema Definido'}
              title={topic ? topic.Title : 'Sit Tema Definido'}
            />
          )} */}

          <div>
            <h3 className="text-2xl hidden md:block">{noticia.title}</h3>

            <div dangerouslySetInnerHTML={{ __html: hometext }} />
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
  fragment NoticiaCard on Noticia {
    sid
    title
    date: time(formatString: "ddd D MMM yy", locale: "es")
    dateslug: time(formatString: "yy-M")
    datePlano: time
    hometext
  }
`

export default NoticiaCard
