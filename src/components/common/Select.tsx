import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 100%;
  text-align: center;
`;
const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  defaultOption
}) => {
  return (
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
  );
};

export default Select;

interface SelectProps {
  options: SelectOption[];
  onChange: Function;
  defaultOption?: SelectOption;
}

export interface SelectOption {
  value: any;
  label: string;
}
