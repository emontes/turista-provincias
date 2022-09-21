import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import styled from 'styled-components'
import TuristaExternos from '../../constants/turista_externos'

import SocialLinks from '../../constants/social_links'
import { BiChevronRightCircle } from 'react-icons/bi'

import Language from './Language'
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next'

const Footer = ({
  title = 'El Turista',
  estado,
  linkExterno = '',
  footerList1,
  footerList2,
}) => {
  const themeContext = useContext(ThemeContext)
  const slugEstado = estado.slug
  const { t } = useI18next()
  return (
    <Wrapper>
      <div className="footer-1">
        <div className="foot">
          <SocialLinks styleClass="footer-icons" slugEstado={slugEstado} />
          <a href="https://turista.com.mx">{themeContext.images.logoSmal2}</a>

          <div className="privacy">
            &copy; {new Date().getFullYear()} {' | '}
            <Link to="/privacidad">
              <Trans>Aviso de Privacidad</Trans>
            </Link>
            <br />
            <Trans>Derechos Reservados</Trans>
          </div>
        </div>
        <div>
          <h1 className="capitalize text-3xl">{title}</h1>

          <div className="enlaces">
            {footerList1 && (
              <div className="foot">
                <h4>{t(footerList1.title)}</h4>
                <ul className="ftr-list">
                  {footerList1.elements.map((link) => {
                    return (
                      <li key={link.id}>
                        <Link to={link.url} className="flex items-center gap-1">
                          <BiChevronRightCircle /> {t(link.title)}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {footerList2 && (
              <div className="foot">
                <h4>{t(footerList2.title)}</h4>
                <ul className="ftr-list">
                  {footerList2.elements.map((link) => {
                    return (
                      <li key={link.id}>
                        <Link to={link.url} className="flex items-center gap-1">
                          <BiChevronRightCircle /> {t(link.title)}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
          <Language />
        </div>

        <div className="foot">{themeContext.images.logoSmal}</div>
      </div>

      <div className="footer-2">
        <Link to="/">
          <Trans>inicio</Trans>
        </Link>{' '}
        |{' '}
        <Link to="/hoteles">
          <Trans>Hoteles</Trans>
        </Link>{' '}
        |&nbsp;
        {TuristaExternos[slugEstado].map((link, i) => {
          const rowLen = TuristaExternos[slugEstado].length
          return (
            <span key={link.id}>
              <a key={link.id} href={`${link.url}${linkExterno}`}>
                {link.text}
              </a>
              {rowLen === i + 1 ? '' : ' | '}
            </span>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
  color: ${(props) => props.theme.colors.primary1};
  background-color: ${(props) => props.theme.colors.primary9};

  h4 {
    color: ${(props) => props.theme.colors.primary2};
    text-transform: capitalize;
    margin: 10px 0 -7px;
  }

  /* social links */
  .social-links {
    margin-top: 0rem;
    width: 100%;
    justify-content: flex-start;
    gap: 1rem;
  }
  .social-link {
    font-size: 2.8rem;
    color: ${(props) => props.theme.colors.primary2};
    transition: var(--transition);
  }
  .social-link:hover {
    color: var(--clr-white);
  }
  .privacy {
    font-size: 1rem;
  }
  .footer-1 {
    padding: 2rem 3rem 3rem;
    display: flex;

    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-evenly;
    align-items: center;
  }

  .enlaces {
    display: flex;
    gap: 3rem;
    justify-content: space-evenly;
  }

  .ftr-list {
    font-size: 1rem;

    margin: 1rem auto 0;

    li {
      text-align: left;
    }
  }
  a {
    :hover {
      color: ${(props) => props.theme.colors.primary10};
    }
  }

  .footer-2 {
    width: 100%;
    background: ${(props) => props.theme.colors.primary1};
    padding: 2.5rem 0;
    text-align: center;
    color: ${(props) => props.theme.colors.primary9};
    a {
      color: ${(props) => props.theme.colors.primary8};
      text-transform: capitalize;
      :hover {
        color: ${(props) => props.theme.colors.primary7};
      }
    }
  }
`
