import React, { useEffect } from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  background-color: ${(props) => props.theme.teal.five};
  text-align: center;
  bottom: 0;
  border-radius: 5px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(
    ${(props: PaginationContainerProps) => props.buttonAmount},
    1fr
  );

  ${(props: PaginationContainerProps) =>
    props.makeItSticky ? 'position: sticky;' : ''}
`;

interface PaginationContainerProps {
  makeItSticky: boolean;
  buttonAmount: number;
}

const PaginationButton = styled.button`
  padding: 1em;
  justify-content: space-between;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.teal.one};
  font-weight: 700;
  background: ${(props) => props.theme.teal.five};

  :hover:not(.active) {
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.lightOne};
    border-radius: 5px;
  }
  :disabled {
    visibility: hidden;
  }
  :focus {
    outline: none;
  }
`;

const CurrentPage = styled.div`
  padding: 1em;
  color: ${(props) => props.theme.teal.ten};
  font-weight: bold;
`;

const DEFAULT_AMOUNT_OF_NEIGHBOURS = 2;

const Pagination: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  nextPage,
  previousPage,
  setPage,
  paginationNeighbours = DEFAULT_AMOUNT_OF_NEIGHBOURS,
  makeItSticky = false
}) => {
  const AMOUNT_OF_NEIGHBOURS = paginationNeighbours;
  let PAGE_NUMBERS_VISIBLE = 2 * AMOUNT_OF_NEIGHBOURS + 1;

  let amountAfterCurrent = AMOUNT_OF_NEIGHBOURS;
  let startIndex = currentPage - AMOUNT_OF_NEIGHBOURS - 1;
  let endIndex = currentPage + AMOUNT_OF_NEIGHBOURS;

  const NEAR_START = PAGE_NUMBERS_VISIBLE - currentPage > AMOUNT_OF_NEIGHBOURS;
  const NEAR_END = currentPage + amountAfterCurrent > totalPages;

  const pageNumbers = Array.from(Array(totalPages).keys()).map(
    (node) => node + 1
  );

  if (NEAR_START) {
    startIndex = 0;
    endIndex = PAGE_NUMBERS_VISIBLE;
  } else if (NEAR_END) {
    endIndex = totalPages;
    startIndex = endIndex - PAGE_NUMBERS_VISIBLE;
    if (startIndex < 0) {
      startIndex = 0;
    }
  }
  const displayedPageNumbers = pageNumbers.slice(startIndex, endIndex);
  let buttonAmount = PAGE_NUMBERS_VISIBLE + 2;
  if (totalPages === 1) {
    buttonAmount = 3;
  } else if (PAGE_NUMBERS_VISIBLE > totalPages) {
    buttonAmount = PAGE_NUMBERS_VISIBLE;
  }
  return (
    <PaginationContainer
      makeItSticky={makeItSticky}
      buttonAmount={buttonAmount}
    >
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => previousPage()}
      >
        Prev
      </PaginationButton>
      {displayedPageNumbers.map((pageNumber) =>
        pageNumber !== currentPage ? (
          <PaginationButton
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </PaginationButton>
        ) : (
          <CurrentPage key={pageNumber}>{currentPage}</CurrentPage>
        )
      )}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => nextPage()}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  nextPage: Function;
  previousPage: Function;
  setPage: Function;
  paginationNeighbours?: number;
  makeItSticky?: boolean;
}

export default Pagination;
