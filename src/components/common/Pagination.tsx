import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  background: #fff;
  display: inline-block;
  width: 100%;
  text-align: center;
  bottom: 0;
  border-radius: 5px;
  ${(props: { makeItSticky: boolean }) =>
    props.makeItSticky ? 'position: sticky;' : ''}
`;

const PaginationButton = styled.button`
  min-width: 56px;
  padding: 8px 16px;
  border: none;
  text-decoration: none;
  background: none;

  .active {
    background-color: #4caf50;
    color: white;
    border-radius: 5px;
  }

  :hover:not(.active) {
    background-color: #ddd;
    border-radius: 5px;
  }
  :disabled {
    visibility: hidden;
  }
  :focus {
    outline: none;
  }
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

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (NEAR_START) {
    startIndex = 0;
    endIndex = PAGE_NUMBERS_VISIBLE;
  } else if (NEAR_END) {
    endIndex = totalPages;
    startIndex = endIndex - PAGE_NUMBERS_VISIBLE;
  }

  const displayedPageNumbers = pageNumbers.slice(startIndex, endIndex);

  return (
    <PaginationContainer makeItSticky={makeItSticky}>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => previousPage()}
      >
        Prev page
      </PaginationButton>
      {displayedPageNumbers.map((pageNumber) => (
        <PaginationButton key={pageNumber} onClick={() => setPage(pageNumber)}>
          {pageNumber == currentPage ? <b>{pageNumber}</b> : pageNumber}
        </PaginationButton>
      ))}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => nextPage()}
      >
        {' '}
        Next page
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
