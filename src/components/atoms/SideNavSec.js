import React from 'react'
import styled from 'styled-components'

import links from '../../constants/links'
import menuBg from '../../assets/images/menu_bg.png'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'

const SideNavSec = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ul className="flex gap-px flex-wrap md:flex-col">
        {links.map((item) => {
          return (
            <li
              key={item.id}
              className="w-fit text-xs sm:text-sm md:w-auto md:text-lg"
            >
              <Link
                to={item.url}
                activeClassName="active"
                className="flex gap-3 items-center"
              >
                {item.icon} {t(item.text)}
              </Link>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

export default SideNavSec

const Wrapper = styled.div`
  li {
    background: url(${menuBg}) repeat-x left top;
    background-color: ${(props) => props.theme.colors.primary1};
    max-height: 51px;
    text-transform: uppercase;
    display: block;

    a {
      color: var(--clr-white);
      padding: 1rem;
      :hover {
        background-color: var(--clr-white);
        color: ${(props) => props.theme.colors.primary1};
      }
    }
  }

  .active {
    background-color: var(--clr-white);

    color: ${(props) => props.theme.colors.primary1};
  }
`
