import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import ContainerGrecas from '../components/molecules/ContainerGrecas'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  //Hits,
  connectHits,
} from 'react-instantsearch-dom'
import styled from 'styled-components'
import LinkCard from '../components/Links/link-card'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)

const NewHits = connectHits(({ hits }) => {
  return hits.map((item) => {
    console.log({ item })
    const link = {
      title: item.title.substring(0, 55),
      url: item.url.substring(0, 40),
      description: item.text ? item.text.substring(0, 150) : '',
    }
    return <LinkCard link={link} />
  })
})

const Buscar = () => {
  return (
    <Layout>
      <Seo title="Búsqueda" description="Buscar información en el Turista" />{' '}
      <ContainerGrecas title={'Buscar'} sideNavSec>
        <Wrapper>
          <InstantSearch
            indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
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

            <Container>
              <NewHits />
            </Container>
          </InstantSearch>
        </Wrapper>
      </ContainerGrecas>
    </Layout>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;

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
    }
  }
`

const Container = styled.div`
  display: grid;
  gap: 2rem;
  /* safari workaround */
  grid-gap: 2rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    .img {
      height: 8.5rem;
    }
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export default Buscar
