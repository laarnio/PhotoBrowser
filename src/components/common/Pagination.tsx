import React, { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../assets/other/colors';

const PaginationContainer = styled.div`
  background: ${colors.brown.lightTwo};
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
  color: ${colors.brown.secondaryOne};
  font-weight: 700;
  background: ${colors.brown.lightTwo};

  :hover:not(.active) {
    background-color: ${colors.brown.secondaryOne};
    color: ${colors.brown.lightOne};
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
  const PAGE_NUMBERS_VISIBLE = 2 * AMOUNT_OF_NEIGHBOURS + 1;

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
  }

  const displayedPageNumbers = pageNumbers.slice(startIndex, endIndex);

  return (
    <PaginationContainer
      makeItSticky={makeItSticky}
      buttonAmount={PAGE_NUMBERS_VISIBLE + 2}
    >
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => previousPage()}
      >
        Prev
      </PaginationButton>
      {displayedPageNumbers.map((pageNumber) =>
        pageNumber !== currentPage ? (
          <PaginationButton key={pageNumber} onClick={() => nextPage()}>
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
