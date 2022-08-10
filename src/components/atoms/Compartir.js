import React from 'react'

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share'

// La documentación de React-share está en https://github.com/nygardk/react-share

const estadoSlug = process.env.ESTADO_SLUG
const siteData = require(`../../constants/configs/${estadoSlug}/siteData`)

const Compartir = ({ url = '', title = 'El Turista' }) => {
  const shareUrl = `${siteData.siteMetadata.url}${url}`
  return (
    <div className="flex gap-1 justify-between">
      <EmailShareButton url={shareUrl} subject={title}>
        <EmailIcon className="w-8" round={true} />
      </EmailShareButton>

      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon className="w-8" round={true} />
      </FacebookShareButton>

      <TwitterShareButton title={title} url={shareUrl}>
        <TwitterIcon className="w-8" round={true} />
      </TwitterShareButton>

      <LinkedinShareButton title={title} url={shareUrl}>
        <LinkedinIcon className="w-8" round={true} />
      </LinkedinShareButton>

      <WhatsappShareButton title={title} url={shareUrl}>
        <WhatsappIcon className="w-8" round={true} />
      </WhatsappShareButton>

      <TelegramShareButton title={title} url={shareUrl}>
        <TelegramIcon className="w-8" round={true} />
      </TelegramShareButton>
    </div>
  )
}

export default Compartir
