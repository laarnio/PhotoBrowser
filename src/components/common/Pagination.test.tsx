import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from 'chai';

import Pagination from './Pagination';
import { ThemeProvider } from 'styled-components';
import { theme } from '../Layout';

// ------------------------- FIRST TEST SET -------------------------------
describe('<Pagination> First Test Set', () => {
  const FirstTest = () =>
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          currentPage={7}
          totalPages={10}
          nextPage={() => placeHolder()}
          previousPage={() => placeHolder()}
          setPage={() => placeHolder()}
        />
      </ThemeProvider>
    );
  it('Renders Pagination pages with default paginationNeighbours', () => {
    const { getByText } = FirstTest();

    expect(getByText(/5/i)).to.be.not.null;
    expect(getByText(/6/i)).to.be.not.null;
    expect(getByText(/7/i)).to.be.not.null;
    expect(getByText(/8/i)).to.be.not.null;
    expect(getByText(/9/i)).to.be.not.null;
  });
  it('Current page 7 should div instead of button', () => {
    const { getByText } = FirstTest();
    const six = getByText(/6/i);
    const seven = getByText(/7/i);
    const eight = getByText(/8/i);

    expect(six.tagName === 'BUTTON').to.be.true;
    expect(seven.tagName === 'DIV').to.be.true;
    expect(eight.tagName === 'BUTTON').to.be.true;
  });
  it('Should not render tenth page', () => {
    const { queryByText } = FirstTest();

    const ten = queryByText(/10/i);
    expect(ten === null).to.be.true; // For some reason expect(ten).to.be.null will freeze the tests if ten is not null
  });
  it('PrevButton and next button should be enabled', () => {
    const { getByText } = FirstTest();
    const prevButton = getByText(/Prev/i);
    const nextButton = getByText(/Next/i);

    expect(prevButton.hasAttribute('disabled')).to.be.false;
    expect(nextButton.hasAttribute('disabled')).to.be.false;
  });
});
// ------------------------- SECOND TEST SET -------------------------------
describe('<Pagination> Second test set', () => {
  const SecondTest = () =>
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          currentPage={1}
          totalPages={10}
          nextPage={() => placeHolder()}
          previousPage={() => placeHolder()}
          setPage={() => placeHolder()}
          paginationNeighbours={0}
        />
      </ThemeProvider>
    );

  it('Renders Pagination pages with zero paginationNeighbours', () => {
    const { getByText } = SecondTest();

    const two = screen.queryByText('2');
    expect(getByText(/1/i)).to.be.not.null;
    expect(two).to.be.null;
  });

  it('Current page 1 should be bolded', () => {
    const { getByText } = SecondTest();
    const one = getByText(/1/i);

    expect(one.tagName === 'DIV').to.be.true;
  });

  it('PrevButton should be disabled and next button enabled', () => {
    const { getByText } = SecondTest();
    const prevButton = getByText(/Prev/i);
    const nextButton = getByText(/Next/i);

    expect(prevButton.hasAttribute('disabled')).to.be.true;
    expect(nextButton.hasAttribute('disabled')).to.be.false;
  });
});
// ------------------------- THIRD TEST SET -------------------------------
describe('<Pagination> Third test set, three paginationNeighbours', () => {
  const ThirdTest = () =>
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          currentPage={10}
          totalPages={10}
          nextPage={() => placeHolder()}
          previousPage={() => placeHolder()}
          setPage={() => placeHolder()}
          paginationNeighbours={3}
        />
      </ThemeProvider>
    );

  it('10 & 4 should be visible, but not 3', () => {
    const { getByText, queryByText } = ThirdTest();

    // Total visible is 3+3+1, so '4' should bee shown, but not '3'

    const three = queryByText(/3/i);
    expect(getByText(/10/i)).to.be.not.null;
    expect(getByText(/4/i)).to.be.not.null;
    expect(three === null).to.be.true;
  });

  it('Current page 10 should be div', () => {
    const { getByText } = ThirdTest();

    // Total visible is 3+3+1, so '4' should bee shown, but not '3'
    const ten = getByText(/10/i);
    const four = getByText(/4/i);

    expect(ten.tagName === 'DIV').to.be.true;
    expect(four.tagName === 'BUTTON').to.be.true;
  });

  it('Prev button should be enabled, Next button disabled', () => {
    const { getByText } = ThirdTest();
    const prevButton = getByText(/Prev/i);
    const nextButton = getByText(/Next/i);
    expect(prevButton.hasAttribute('disabled')).to.be.false;
    expect(nextButton.hasAttribute('disabled')).to.be.true;
  });
});
// ------------------------- FOURTH TEST SET -------------------------------
describe('<Pagination> Fourth test set, two paginationNeighbours only 3 pages', () => {
  const FourthTest = () =>
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          currentPage={3}
          totalPages={3}
          nextPage={() => placeHolder()}
          previousPage={() => placeHolder()}
          setPage={() => placeHolder()}
          paginationNeighbours={2}
        />
      </ThemeProvider>
    );

  it('Prev, 1, 2, 3 should be visible', () => {
    const { getByText, queryByText } = FourthTest();
    const four = queryByText(/4/i);
    expect(getByText(/Prev/i)).to.be.not.null;
    expect(getByText(/1/i)).to.be.not.null;
    expect(getByText(/2/i)).to.be.not.null;
    expect(getByText(/3/i)).to.be.not.null;
    expect(four === null).to.be.true;
  });
});

const placeHolder = () => {};
