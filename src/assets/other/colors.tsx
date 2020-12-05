export const colors: IColors = {
  brown: {
    primary: '#4A2E00',
    secondaryOne: '#8C5906',
    secondaryTwo: '#CCAB76',
    lightOne: '#FFFAF1',
    lightTwo: '#efd1a1'
  }
};

export interface IColors {
  brown: IColor;
}

export interface IColor {
  primary: string;
  secondaryOne: string;
  secondaryTwo: string;
  lightOne: string;
  lightTwo: string;
}
