import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';

import Select, { SelectOption } from './Select';
import { ThemeProvider } from 'styled-components';
import {theme} from '../Layout';

describe('<Select>', () => {
  it('Renders options and has default value correctly', () => {
    const optionOne = createOption(1, 'test');
    const optionTwo = createOption(2, 'Foobar');
    const options: SelectOption[] = [optionOne, optionTwo];
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Select
          options={options}
          defaultOption={optionOne}
          onChange={(value: number) => value}
        />
      </ThemeProvider>
      
    );
    const optionOneElement = getByText(/test/i);
    const optionTwoElement = getByText(/Foobar/i);

    expect(optionOneElement.hasAttribute('selected')).to.be.true;
    expect(optionTwoElement.hasAttribute('selected')).not.to.be.true;
  });
});

const createOption = (value: number, label: string) => {
  const option: SelectOption = {
    value,
    label
  };
  return option;
};
