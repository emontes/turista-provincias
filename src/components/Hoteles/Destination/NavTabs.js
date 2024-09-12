import React from 'react'
import styled from 'styled-components'
import tabs from '../../../constants/Hoteles/nav-tabs'
import { Link } from 'gatsby'
import { vistaStarsToUrl } from '../../../utilities/stringService'

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary1};
  &:hover {
    background-color: ${(props) => props.theme.colors.primary10};
  }
`

const NavTabs = ({ vista, estrellas }) => {
  return (
    <div className="relative pt-1">
      <ul className="flex justify-around items-end">
        {estrellas
          ? estrellas.map((item) => {
              const estrellitas = '★'.repeat(item);
              return (
                <li key={item} className="relative z-10">
                  <StyledLink
                    to={`/${vistaStarsToUrl(vista, 'spanish', item)}`}
                    activeClassName="bg-white border-t border-x border-gray-300 border-b-white"
                    className="inline-block px-4 py-2 text-lg text-yellow-500 rounded-t transition duration-300"
                    title={`Hoteles ${item} estrellas`}
                  >
                    {item} {estrellitas}
                  </StyledLink>
                </li>
              )
            })
          : tabs.map((tab) => {
              return (
                <li key={tab.url} className="relative z-10">
                  <StyledLink
                    activeClassName="bg-white border-t border-x border-gray-300 border-b-white"
                    className="flex items-center px-4 py-2 rounded-t transition duration-300"
                  >
                    {tab.icon}
                    <span className="ml-2 hidden lg:inline">{tab.title}</span>
                  </StyledLink>
                </li>
              )
            })}
      </ul>
      <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300" />
    </div>
  )
}

export default NavTabs