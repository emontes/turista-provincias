import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import { FaAlignRight } from 'react-icons/fa'
import linksTop from '../constants/links-top'
import { Link } from 'gatsby'
import { debounce } from '../utilities/helpers'
import device from '../assets/themes/device'

const Navbar = ({ toggleSidebar }) => {
  const themeContext = useContext(ThemeContext)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 60) ||
        currentScrollPos < 10,
    )

    setPrevScrollPos(currentScrollPos)
  }, 250)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible, handleScroll])

  return (
    <Wrapper>
      <div className={visible ? 'navbar' : 'navbar-fixed'}>
        <div className="w-full px-4 mx-auto flex justify-between">
          <div className="flex justify-between w-full">
            <Link to="/">{themeContext.images.logoNav}</Link>
            <button type="button" className="toggle-btn">
              <FaAlignRight onClick={toggleSidebar} />
            </button>
          </div>

          <div className="nav-links font-helvetica text-black">
            {linksTop.map((link) => {
              return (
                <Link
                  key={link.id}
                  to={link.url}
                  activeStyle={{ color: 'var(--clr-red-dark)' }}
                  title={link.text}
                  className="flex items-center"
                >
                  <span className="bg-slate-200 p-3 rounded-full">
                    {link.icon}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.div`
  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5.8rem;
    display: flex;
    align-items: center;
    z-index: 200;
    background: var(--clr-white);
  }

  .navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5.6rem;
    display: flex;
    align-items: center;
    z-index: 200;
    background: var(--clr-white);
    transition: var(--transition);
    border-bottom: 0.116rem solid ${(props) => props.theme.colors.primary5};
    box-shadow: var(--dark-shadow);
  }

  .logo {
    width: 12rem;
  }

  .toggle-btn {
    font-size: 2.32rem;
    background: transparent;
    border-color: transparent;
    color: ${(props) => props.theme.colors.primary5};
    cursor: pointer;
    transition: var(--transition);
  }
  .toggle-btn:hover {
    color: ${(props) => props.theme.colors.primary2};
  }
  .nav-links {
    display: none;
  }

  @media screen and ${device.lg} {
    .toggle-btn {
      display: none;
    }
    .nav-links {
      display: flex;
      justify-content: flex-end;
    }

    .nav-links a {
      text-transform: capitalize;

      font-size: 1rem;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      padding: 0.58rem 0;

      :not(:last-child) {
        margin-right: 2.32rem;
      }
    }
    .nav-links a:hover {
      color: ${(props) => props.theme.colors.primary5};
      box-shadow: 0px 2px ${(props) => props.theme.colors.primary5};
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
    }
  }

  @media screen and ${device.lg} {
    background: transparent;
  }
`
