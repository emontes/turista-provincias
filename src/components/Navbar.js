import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { FaAlignRight } from 'react-icons/fa'
import linksTop from '../constants/links-top'
import { debounce } from '../utilities/helpers'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import styled from 'styled-components'

const Navbar = ({ toggleSidebar }) => {
  const themeContext = useContext(ThemeContext)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const { t } = useTranslation()

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset
    setVisible(
      prevScrollPos > currentScrollPos || currentScrollPos < 10
    )
    setPrevScrollPos(currentScrollPos)
  }, 250)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ backgroundColor: themeContext.colors.primary10 }}
    >
      <div className={'w-full px-4 py-4 mx-auto flex justify-between items-center border-b-2 shadow-md'}
           style={{ borderColor: themeContext.colors.primary1 }}>
        <div className="flex justify-between w-full lg:w-auto">
        <Link to="/" className="flex items-center">
            <LogoContainer>
              {themeContext.images.logoNav}
            </LogoContainer>
          </Link>

          <button 
            type="button" 
            className="toggle-btn lg:hidden text-3xl" 
            onClick={toggleSidebar}
            style={{ color: themeContext.colors.primary5 }}
          >
            <FaAlignRight />
          </button>
        </div>

        <div className="hidden lg:flex space-x-6 font-bold text-lg">
          {linksTop.map((link) => (
            <Link
              key={link.id}
              to={link.url}
              title={t(link.text)}
              className="flex items-center hover:text-red-700 transition-colors duration-200"
              activeClassName="text-red-700"
              style={{ color: themeContext.colors.primary1 }}
            >
              <span className="bg-white p-2 rounded-full mr-2 shadow-md">
                {link.icon}
              </span>
              <span className="hidden xl:inline">{t(link.text)}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

const LogoContainer = styled.div`
  width: 12rem; 
`