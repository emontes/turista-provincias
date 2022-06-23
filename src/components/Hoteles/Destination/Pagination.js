import React from 'react'
import ButtonPages from '../../atoms/ButtonPages'
import styled from 'styled-components'
const Pagination = ({ pageInfo, url }) => {
  let nextPage
  if (pageInfo.hasNextPage) {
    nextPage = `/${url}-p${pageInfo.currentPage + 1}.html`
  }
  let previousPage

  if (pageInfo.hasPreviousPage) {
    previousPage = `/${url}-p${pageInfo.currentPage - 1}.html`
    if (pageInfo.currentPage === 2) {
      previousPage = `/${url}.html`
    }
  }

  return (
    <Wrapper>
      <div className="paginas">
        {previousPage && (
          <ButtonPages
            url={previousPage}
            description="« &nbsp;Anterior&nbsp;"
          />
        )}
        {nextPage && <ButtonPages url={nextPage} description="Siguiente »" />}
      </div>
      {pageInfo.pageCount > 1 && (
        <div className="resultados">
          Página {pageInfo.currentPage} de {pageInfo.pageCount}
        </div>
      )}
    </Wrapper>
  )
}

export default Pagination

const Wrapper = styled.div`
  margin-top: 3rem;
  .paginas {
    display: flex;
    justify-content: center;
  }

  .resultados {
    font: 400 14px/20px Roboto, Arial, sans-serif;
    letter-spacing: 0.2px;
    color: ${(props) => props.theme.colors.primary8};
    display: flex;
    justify-content: center;
    margin: 16px 0 48px;
  }
`
