import React from 'react';
const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  defaultOption
}) => {
  return (
    <select
      defaultValue={defaultOption?.value}
      onChange={(e) => onChange(e.currentTarget.value)}
    >
      {options.map((option: SelectOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
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
