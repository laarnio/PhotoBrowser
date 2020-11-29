import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
  it('renders Main page', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Main page/i);
  });
  it('renders Nav Bar', () => {
    const { getByText } = render(<App />);
    const homeNavBarElement = getByText(/Home/i);
    const photosNavbarElement = getByText(/Photos/i);
  });
});
