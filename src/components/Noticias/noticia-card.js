// src/components/Noticias/noticia-card.js

import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FaRegClock, FaFolder } from 'react-icons/fa'

const NoticiaCard = ({ noticia }) => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "topicImages" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(width: 200, height: 133, layout: CONSTRAINED)
          }
        }
      }
    }
  `)

  const getTopicImage = (filename) => {
    const image = allFile.nodes.find(node => node.relativePath === filename)
    return image ? getImage(image.childImageSharp.gatsbyImageData) : null
  }

  const hometext = noticia.hometext
  const slug = `/article${noticia.sid}.html`
  const topicImage = noticia.topicimage ? getTopicImage(noticia.topicimage) : null
  const topicUrl = noticia.topictext ? `/noticias/tema/${encodeURIComponent(noticia.topictext.toLowerCase().replace(/ /g, '-'))}.html` : ''

  return (
    <article className="transition rounded-lg bg-white hover:bg-gray-50 shadow-md hover:shadow-xl relative mb-5 p-4 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {topicImage && (
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <Link to={topicUrl}>
              <GatsbyImage
                image={topicImage}
                className="rounded-lg w-full h-32 object-cover"
                alt={noticia.topictext || ''}
                title={noticia.topictext || ''}
              />
            </Link>
          </div>
        )}
        <div className="w-full md:w-3/4">
          <Link to={slug} className="block">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{noticia.title}</h3>
            <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: hometext }} />
          </Link>
        </div>
      </div>
      <footer className="mt-4 pt-4 border-t flex items-center justify-between text-gray-500">
        <span className="flex items-center gap-2">
          <FaRegClock className="text-gray-500" />
          {noticia.date}
        </span>
        {noticia.cattitle && (
          <Link to={`/noticias/${encodeURIComponent(noticia.cattitle.toLowerCase().replace(/ /g, '-'))}.html`}>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-semibold flex items-center">
              <FaFolder className="mr-1" /> {noticia.cattitle}
            </span>
          </Link>
        )}
      </footer>
    </article>
  )
}

export const query = graphql`
  fragment NoticiaCard on Noticia {
    sid
    title
    date: time(formatString: "ddd D MMM yy", locale: "es")
    dateslug: time(formatString: "yy-M")
    datePlano: time
    topic
    topictext
    topicimage
    catid
    cattitle
    hometext
  }
`

export default NoticiaCard