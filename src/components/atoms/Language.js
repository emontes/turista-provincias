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

const Language = () => {
  const { language, languages, originalPath } = useI18next()
  return (
    <Wrapper>
      <ul className="flex justify-between">
        {languages.map((lng) => {
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
  font-size: -5rem;
  postion: relative;

  :hover {
    cursor: pointer;
    ul {
      opacity: 1;
      top: -5rem;
    }
  }
  .current-language {
    border: 1px solid var(--clr-grey-9);
    border-radius: var(--radius);
    color: var(--clr-grey-5);
    padding: 0.8rem 2rem;

    display: flex;
    justify-content: center;
    gap: 1rem;
    z-index: 3;
  }

  ul {
    /* position: absolute; */

    /* top: -11rem; */
    /* opacity: 0; */
    padding: 0.8rem;
    transition: var(--transition);
    /* margin-top: 8rem; */
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
    color: var(--clr-primary-5);
  }
`
