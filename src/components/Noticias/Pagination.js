import React from 'react'
import ButtonPages from './ButtonPages'
import styled from 'styled-components'
const Pagination = ({ pageInfo, url }) => {
  let nextPage
  if (pageInfo.hasNextPage) {
    nextPage = `${url}/${pageInfo.currentPage + 1}`
  }
  let previousPage

  if (pageInfo.hasPreviousPage) {
    previousPage = `${url}/${pageInfo.currentPage - 1}`
    if (pageInfo.currentPage === 2) {
      previousPage = `${url}`
      if (url === '/noticias/ultimas') previousPage = '/noticias'
    }
  }
  return (
    <Wrapper>
      {previousPage && (
        <ButtonPages
          url={previousPage}
          description="« Artículos mas recientes"
        />
      )}
      {nextPage && (
        <ButtonPages url={nextPage} description="Artículos mas antigüos »" />
      )}
    </Wrapper>
  )
}

export default Pagination

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
