import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import ContainerGrecas from '../components/molecules/ContainerGrecas'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Pagination,
} from 'react-instantsearch-dom'
import styled from 'styled-components'
import LinkCard from '../components/Links/link-card'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)

function Hit(props) {
  const link = {
    title: <Highlight attribute="title" hit={props.hit} />,
    url: props.hit.url.substring(0, 40),
    description: <Highlight attribute="text" hit={props.hit} />,
  }
  return <LinkCard link={link} style={{ border: '1px solid green' }} />
}

const Buscar = () => {
  return (
    <Layout>
      <Seo title="Búsqueda" description="Buscar información en el Turista" />{' '}
      <ContainerGrecas title={'Buscar'} sideNavSec>
        <Wrapper>
          <InstantSearch
            indexName={process.env.ESTADO_SLUG}
            searchClient={searchClient}
          >
            <SearchBox
              translations={{
                submitTitle: 'Enviar su Búqueda.',
                resetTitle: 'Limpiar su búsqueda.',
                placeholder: 'Buscar aquí...',
              }}
              searchAsYouType={false}
            />

            <Hits hitComponent={Hit} />

            <Pagination />
          </InstantSearch>
        </Wrapper>
      </ContainerGrecas>
    </Layout>
  )
}

const Wrapper = styled.section`
  .ais-Pagination {
    margin: 1rem auto 1rem;
  }

  .ais-Pagination-list {
    display: flex;
    font-size: 1.5rem;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .ais-Pagination-link {
    padding: 0.3rem 0.6rem;
    display: block;
    border: 1px solid #c4c8d8;
    border-radius: 5px;
    transition: background-color 0.2s ease-out;
  }

  .ais-Pagination-item--disabled .ais-Pagination-link {
    opacity: 0.6;
    cursor: not-allowed;
    color: #a5abc4;
  }

  .ais-Pagination-item--selected .ais-Pagination-link {
    color: #fff;
    background-color: ${(props) => props.theme.colors.primary5};
    border-color: ${(props) => props.theme.colors.primary5};
  }

  .ais-SearchBox {
    width: 90vw;
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 2rem;
    form {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 3rem 3rem;
      input,
      button {
        border: transparent;
        font-size: 1.1rem;
      }
      input {
        border: 1px solid ${(props) => props.theme.colors.primary5};
        padding: 0.5rem 1rem;
        outline-color: var(--clr-grey-9);
      }
      button {
        background: ${(props) => props.theme.colors.primary5};

        svg {
          fill: var(--clr-white);
        }
      }
      button.ais-SearchBox-reset {
        background: var(--clr-red-light);
      }
      .ais-SearchBox-submitIcon,
      .ais-SearchBox-resetIcon {
        margin: auto;
      }
    }
  }

  .ais-Hits-list {
    display: grid;
    gap: 2rem;
    /* safari workaround */
    grid-gap: 2rem;
    grid-template-columns: repeat(1, 100%);
    @media (min-width: 576px) {
      grid-template-columns: repeat(2, 50%);
      .img {
        height: 8.5rem;
      }
    }
    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 33%);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 24%);
    }
  }

  p {
    height: 11.5rem;
    overflow: hidden;
  }

  .ais-Highlight-highlighted {
    background: ${(props) => props.theme.colors.primary10};
  }
`

export default Buscar
