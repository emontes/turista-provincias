import React from 'react'
import tabs from '../../../constants/Hoteles/nav-tabs'
import { Link } from 'gatsby'
import styled from 'styled-components'
import device from '../../../assets/themes/device'

const NavTabs = ({ url, estrellas }) => {
  return (
    <Wrapper>
      <ul>
        {estrellas
          ? estrellas.map((item) => {
              let estrellitas = ''
              let i
              for (i = 0; i < item; i++) estrellitas += '★'
              return (
                <li key={item}>
                  <Link
                    to={`/${url}-estrellas-${item}.html`}
                    activeClassName="active"
                    className="stars"
                    title={`Hoteles ${item} estrellas`}
                  >
                    {item} {estrellitas}
                  </Link>
                </li>
              )
            })
          : tabs.map((tab) => {
              return (
                <li key={tab.url}>
                  <Link to={`/${url}-${tab.url}.html`} activeClassName="active">
                    {tab.icon}
                    <span className="tab-title">{tab.title}</span>
                  </Link>
                </li>
              )
            })}
      </ul>
      <div className="line"></div>
    </Wrapper>
  )
}

export default NavTabs
const Wrapper = styled.div`
  padding: 0.5rem 0 1rem;
  ul {
    display: flex;
    justify-content: space-around;
  }

  .stars {
    background: var(--clr-white-transparency-8);
    color: #f9c40a;
    font-size: 1.2rem;
  }

  a {
    border-radius: 3px;
    padding: 1rem;
    color: ${(props) => props.theme.colors.primary1};

    :hover {
      background: ${(props) => props.theme.colors.primary10};
    }
  }
  .tab-title {
    display: none;
    @media ${device.tablet} {
      margin-left: 5px;
      display: inline-block;
    }
  }
  .active {
    color: var(--clr-red-light);
    border: 1px solid var(--clr-grey-5);
    border-bottom: 1px solid var(--clr-white);
  }
  .line {
    width: 100%;
    margin-top: 0.8rem;
    border-bottom: 1px solid var(--clr-grey-5);
  }
`
