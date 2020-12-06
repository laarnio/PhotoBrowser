import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  color: ${(props) => props.theme.teal.seven};
  background-color: ${(props) => props.theme.lightOne};
  width: 100%;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  .select:hover {
    background-color: black;
  }
`;

const LabelText = styled.label`
  color: ${(props) => props.theme.darkOne};
  font-size: smaller;
`;

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  defaultOption,
  label
}) => {
  options = options.sort(
    (a: SelectOption, b: SelectOption) => a.value - b.value
  );

  return (
    <>
      <LabelText>{label}</LabelText>
      <StyledSelect
        defaultValue={defaultOption?.value}
        onChange={(e) => onChange(e.currentTarget.value)}
      >
        {options.map((option: SelectOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

export default Select;

interface SelectProps {
  options: SelectOption[];
  onChange: Function;
  defaultOption?: SelectOption;
  label?: string;
}

export type SelectOption = {
  value: any;
  label: string;
};
