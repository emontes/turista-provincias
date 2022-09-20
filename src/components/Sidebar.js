import React from 'react'
import links from '../constants/links'
import SocialLinks from '../constants/social_links'
import { FaTimes } from 'react-icons/fa'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { t } = useTranslation()
  return (
    <aside className={isOpen ? 'sidebar show-sidebar' : 'sidebar'}>
      <button className="close-btn" type="button" onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <div className="side-container">
        <ul className={isOpen ? 'sidebar-links' : null}>
          {links.map((link) => {
            return (
              <li key={link.id}>
                <Link to={link.url} onClick={toggleSidebar}>
                  {t(link.text)}
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className={isOpen ? 'social-links sidebar-icons' : null}>
          <SocialLinks styleClass="nav-icons" />
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
