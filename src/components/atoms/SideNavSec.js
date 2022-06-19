import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import links from '../../constants/links'
import device from '../../assets/themes/device'
import menuBg from '../../assets/images/menu_bg.png'

const SideNavSec = () => {
  return (
    <Wrapper>
      <ul>
        {links.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.url} activeClassName="active">
                {item.text}
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
  min-width: 15rem;

  ul {
    display: flex;
    gap: 1px;
    font-size: 1.2rem;
    flex-wrap: wrap;
    @media ${device.tablet} {
      flex-direction: column;
      font-size: 1.4rem;
    }
    li {
      background: url(${menuBg}) repeat-x left top;
      background-color: ${(props) => props.theme.colors.primary1};
      height: 50px;

      text-transform: uppercase;

      display: block;

      a {
        display: block;
        color: var(--clr-white);
        padding: 1rem;

        :hover {
          background-color: var(--clr-white);
          height: 51px;
          color: ${(props) => props.theme.colors.primary1};
        }
      }
    }
  }

  .active {
    background-color: var(--clr-white);
    height: 51px;
    color: ${(props) => props.theme.colors.primary1};
  }
`
