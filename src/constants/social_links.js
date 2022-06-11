import React from 'react'
import { FaFacebookSquare, FaTwitterSquare, FaFlickr } from 'react-icons/fa'

const SocialLinks = ({ styleClass, slugEstado }) => {
  let faceLink = 'groups/turistachiapas'
  let flickrLink = 'turistachiapas'
  if (slugEstado === 'edomexico') {
    faceLink = 'turistamexico'
    flickrLink = 'turistaedomexico'
  }

  return (
    <ul className={styleClass}>
      <li>
        <a href={`https://facebook.com/${faceLink}`}>
          <FaFacebookSquare className="social-icon facebook-icon"></FaFacebookSquare>
        </a>
      </li>
      <li>
        <a href={`https://www.flickr.com/groups/${flickrLink}`}>
          <FaFlickr className="social-icon dribble-icon"></FaFlickr>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/turistamexico">
          <FaTwitterSquare className="social-icon twitter-icon"></FaTwitterSquare>
        </a>
      </li>
    </ul>
  )
}
export default SocialLinks
