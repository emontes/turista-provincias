import React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import styled from 'styled-components'
import esFlag from '../../assets/images/flags/mx.svg'
import usFlag from '../../assets/images/flags/us.svg'

const languageName = {
  es: 'Español',
  en: 'English',
}
const languageFlag = {
  es: esFlag,
  en: usFlag,
}

const Language = ({ extendidos }) => {
  const { language, languages, originalPath } = useI18next()
  console.log({ extendidos })
  return (
    <Wrapper>
      <ul className="flex justify-between">
        {extendidos
          ? extendidos.map((item) => {
              return (
                <li key={item.lng}>
                  <Link key={item.lng} to={item.slug} language={item.lng}>
                    <img
                      src={languageFlag[item.lng]}
                      alt={languageName[item.lng]}
                      style={{ height: '1.2rem' }}
                    />
                    {item.title}
                  </Link>
                </li>
              )
            })
          : languages.map((lng) => {
              return (
                <li key={lng}>
                  <Link
                    key={lng}
                    to={originalPath}
                    language={lng}
                    className={`link ${lng === language ? 'selected' : ''}`}
                  >
                    <img
                      src={languageFlag[lng]}
                      alt={languageName[lng]}
                      style={{ height: '1.2rem' }}
                    />
                    {languageName[lng]}
                  </Link>
                </li>
              )
            })}
      </ul>
    </Wrapper>
  )
}

export default Language

const Wrapper = styled.div`
  postion: relative;

  ul {
    padding: 0.3rem;
    transition: var(--transition);
    background-color: var(--clr-white);
    border: 1px solid var(--clr-grey-9);
    border-radius: var(--radius);
    box-shadow: var(--light-shadow);
    li {
      transition: var(--transition);
      :hover {
        background-color: var(--clr-primary-8);
      }
    }
  }

  .link {
    margin: 5px;
    cursor: pointer;
    color: var(--clr-grey-1);
    display: flex;
    align-content: center;
    gap: 10px;
  }

  .selected {
    color: var(--clr-grey-10);
  }
`
