import * as React from 'react';
import {
  render,
  fireEvent,
  screen,
  getByRole,
  getByTestId,
  queryByText
} from '@testing-library/react';
import { expect } from 'chai';

import Pagination from './Pagination';

// ------------------------- FIRST TEST SET -------------------------------
describe('<Pagination> First Test Set', () => {
  const FirstTest = () =>
    render(
      <Pagination
        currentPage={7}
        totalPages={10}
        nextPage={() => placeHolder()}
        previousPage={() => placeHolder()}
        setPage={() => placeHolder()}
      />
    );
  it('Renders Pagination pages with default paginationNeighbours', () => {
    const { getByText } = FirstTest();

    const five = getByText(/5/i);
    const six = getByText(/6/i);
    const seven = getByText(/7/i);
    const eight = getByText(/8/i);
    const nine = getByText(/9/i);
  });
  it('Current page 7 should be bolded', () => {
    const { getByText } = FirstTest();
    const six = getByText(/6/i);
    const seven = getByText(/7/i);
    const eight = getByText(/8/i);

    expect(six.tagName === 'BUTTON').to.be.true;
    expect(seven.tagName === 'B').to.be.true;
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
      <Pagination
        currentPage={1}
        totalPages={10}
        nextPage={() => placeHolder()}
        previousPage={() => placeHolder()}
        setPage={() => placeHolder()}
        paginationNeighbours={0}
      />
    );

  it('Renders Pagination pages with zero paginationNeighbours', () => {
    const { getByText } = SecondTest();

    const one = getByText(/1/i);
    const two = screen.queryByText('2');

    expect(two).to.be.null;
  });

  it('Current page 1 should be bolded', () => {
    const { getByText } = SecondTest();
    const one = getByText(/1/i);

    expect(one.tagName === 'B').to.be.true;
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
      <Pagination
        currentPage={10}
        totalPages={10}
        nextPage={() => placeHolder()}
        previousPage={() => placeHolder()}
        setPage={() => placeHolder()}
        paginationNeighbours={3}
      />
    );

  it('10 & 4 should be visible, but not 3', () => {
    const { getByText, queryByText } = ThirdTest();

    // Total visible is 3+3+1, so '4' should bee shown, but not '3'
    const ten = getByText(/10/i);
    const four = getByText(/4/i);
    const three = queryByText(/3/i);

    expect(three === null).to.be.true;
  });

  it('Current page 10 should be bolded', () => {
    const { getByText } = ThirdTest();

    // Total visible is 3+3+1, so '4' should bee shown, but not '3'
    const ten = getByText(/10/i);
    const four = getByText(/4/i);

    expect(ten.tagName === 'B').to.be.true;
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

const placeHolder = () => {};
