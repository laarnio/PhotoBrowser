import React from 'react';
import styled from 'styled-components';

const Pagination = styled.div`
  display: inline-block;

  a {
    color: black;

    padding: 8px 16px;
    text-decoration: none;
  }

  a.active {
    background-color: #4caf50;
    color: white;
    border-radius: 5px;
  }

  a:hover:not(.active) {
    background-color: #ddd;
    border-radius: 5px;
  }
`;
const DEFAULT_AMOUNT_OF_NEIGHBOURS = 2;

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  nextPage,
  previousPage,
  amountOfNeighbours = DEFAULT_AMOUNT_OF_NEIGHBOURS
}) => {
  const AMOUNT_OF_NEIGHBOURS = amountOfNeighbours;
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
    <Pagination>
      <button disabled={currentPage == 1} onClick={() => previousPage()}>
        Prev page
      </button>
      {displayedPageNumbers.map((pageNumber) => (
        <a key={pageNumber} href="#">
          {pageNumber == currentPage ? <b>{pageNumber}</b> : pageNumber}
        </a>
      ))}
      <button onClick={() => nextPage()}> Next page</button>
    </Pagination>
  );
};
interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  nextPage: Function;
  previousPage: Function;
  amountOfNeighbours?: number;
}

export default PaginationComponent;
